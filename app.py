from flask import Flask, render_template, request, jsonify, flash
from pymongo import MongoClient

client = MongoClient('mongodb://test:test@13.125.103.163', 27017)
# client = MongoClient('localhost', 27017)
db = client.piracheminMartDB  # 'piracheminMartDB' db 생성

app = Flask(__name__)

# 사용자지정 비번 (관리자 비번)
app.secret_key = '피라체민_프로젝트_냉장고파먹기_8조'


# 로그인 전 index

@app.route('/')
def home1():
    return render_template('index.html')


# 로그인 후 index
@app.route('/join_index')
def home2():
    return render_template('join_index.html')


# 재료
@app.route('/ingredient')
def ingredient():
    return render_template('ingredient.html')


# 마트
@app.route('/mart')
def mart():
    return render_template('mart.html')


input_id = ''


# 로그인
@app.route('/login', methods=['GET', 'POST'])
def login_member():
    if request.method == 'POST':
        global input_id
        input_id = request.form.get('id')
        input_pwd = request.form.get('pwd')
        user_find_id = db.membersDB.find_one({'id': input_id})
        user_find_pwd = db.membersDB.find_one({'pw': input_pwd})
        if user_find_id is None:
            flash("회원 정보가 없거나 ID가 틀렸습니다. ㅠ_ㅠ")
            return render_template('index.html')
        elif user_find_pwd is None:
            flash("Password가 틀렸습니다. ㅠ_ㅠ")
            return render_template('index.html')
        else:
            flash("반갑습니다! 회원님!")
            return render_template('join_index.html')


# 회원가입
@app.route('/registers', methods=['GET', 'POST'])
def new_member():
    if request.method == 'POST':
        username = request.form.get('username')
        new_id = request.form.get('id')
        new_pwd = request.form.get('pwd')
        new_user_data = {
            'name': username,
            'id': new_id,
            'pw': new_pwd
        }

        compare_username = db.membersDB.find_one({'name': username})
        if compare_username is None:
            flash("회원가입 완료!!")
            db.membersDB.insert_one(new_user_data)
            return render_template('index.html')
        else:
            flash("현재 NAME이 중복됩니다. 다른 NAME을 설정해주세요. ㅠ_ㅠ")
            return render_template('index.html')


# 재료추가
@app.route('/newItem', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':

        food_name = request.form.get('food_name')
        target = request.form.get('target')
        print("food_name is", food_name)
        print("target name is", target)
        food_find = db.NutrientsDB.find_one({'음식명': food_name}, {'_id': False})
        print("food_find is", food_find)

        if food_find is not None:
            flash('완료!')
            db.userItem.insert_one(food_find)
            return render_template('ingredient.html')
        elif food_find is None and target is None:
            flash('찾는 재료가 없어요! ㅠ_ㅠ')
            return render_template('ingredient.html')
        elif target is not None:
            food_find = db.userItem.delete_one({'음식명': target})
            return render_template('ingredient.html')
    elif request.method == 'GET':
        food_find_list = list(db.userItem.find({}, {'_id': False}))
        print("food_find_list is", food_find_list)
        return jsonify({'all_food': food_find_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)