"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Role, User_role
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS---------------
#----------------ENDPOINTS USER---------------
@api.route('/user', methods=['GET'])
def get_users():

    results = User.query.all()
    users_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /user response ",
        "results": users_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en USER
@api.route('/user/<int:id>', methods=['GET'])
def get_single_user(id):
    print(id)

    user = User.query.filter_by(id=id).first()
    print(user)
# comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
    if user is None:
        raise APIException("No hay un usuario con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /user response ",
        "result": user.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla USER
@api.route('/user', methods=['POST'])
def create_user():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'username' not in body:
        raise APIException('Te falta añadir un nombre de usuario', status_code=400)
    if 'email' not in body:
        raise APIException('Te falta añadir un correo electrónico', status_code=400)
    if 'password' not in body:
        raise APIException('Te falta añadir una contraseña', status_code=400)
    
    print(body)
    user = User(username=body["username"], email=body["email"], password=body["password"])
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "El usuario ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en USER 
# @api.route('/user/<int:id>', methods=['DELETE'])
# def delete_user(id):
#     print(id)

#     user = User.query.filter_by(id=id).first()
# # comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
#     if user is None:
#         raise APIException("No hay un usuario con ese ID", status_code=404)

#     db.session.delete(user)
#     db.session.commit()

#     response_body = {
#         "msg": "El usuario ha sido borrado",
#     }

#     return jsonify(response_body), 200

#----------------ENDPOINTS ROLE---------------

@api.route('/role', methods=['GET'])
def get_roles():

    results = Role.query.all()
    roles_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /role response ",
        "results": roles_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en USER

@api.route('/role/<int:id>', methods=['GET'])
def get_single_role(id):
    print(id)

    role = Role.query.filter_by(id=id).first()
    print(role)
# comprobamos que existe un rol con ese id, si no es asi, respondemos un mensaje de error
    if role is None:
        raise APIException("No hay un rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /user response ",
        "result": role.serialize()
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS USER_ROLE-----------

@api.route('/user_role', methods=['GET'])
def get_user_roles():

    results = User_role.query.all()
    user_roles_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /user_role response ",
        "results": user_roles_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion usuario rol en concreto

@api.route('/user_role/<int:id>', methods=['GET'])
def get_single_user_role(id):
    print(id)

    user_role = User_role.query.filter_by(id=id).first()
    print(user_role)
# comprobamos que existe un usuario_rol con ese id, si no es asi, respondemos un mensaje de error
    if user_role is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /user response ",
        "result": user_role.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla USER_ROLE
@api.route('/user_role', methods=['POST'])
def create_user_role():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'role_id' not in body:
        raise APIException('Te falta añadir un id de rol', status_code=400)
    if 'user_id' not in body:
        raise APIException('Te falta añadir un id de usuario', status_code=400)
    
    print(body)
    user_role = User_role(role_id=body["role_id"], user_id=body["user_id"])
    db.session.add(user_role)
    db.session.commit()

    response_body = {
        "msg": "El usuario_rol ha sido creado",
    }

    return jsonify(response_body), 200