"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Role, User_role, Pro_profile, Cmr_profile, Pro_user_profile, Cmr_user_profile
from api.utils import generate_sitemap, APIException
# from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

# # Setup the Flask-JWT-Extended extension
# api.config["JWT_SECRET_KEY"] = "forkstig-abercrombie-42"  # Change this!
# jwt = JWTManager(api)


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

# endpoint para consultar un dato en ROLE

@api.route('/role/<int:id>', methods=['GET'])
def get_single_role(id):
    print(id)

    role = Role.query.filter_by(id=id).first()
    print(role)
# comprobamos que existe un ROLE con ese id, si no es asi, respondemos un mensaje de error
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

#----------------ENDPOINTS PRO_PROFILE---------------
@api.route('/pro_profile', methods=['GET'])
def get_pro_profiles():

    results = Pro_profile.query.all()
    pro_profile_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_profile response ",
        "results": pro_profile_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en PRO_PROFILE
@api.route('/pro_profile/<int:id>', methods=['GET'])
def get_single_pro_profile(id):
    print(id)

    pro_profile = Pro_profile.query.filter_by(id=id).first()
    print(pro_profile)
# comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
    if pro_profile is None:
        raise APIException("No hay un perfil profesional con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_profile response ",
        "result": pro_profile.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla PRO_PROFILE
@api.route('/pro_profile', methods=['POST'])
def create_pro_profile():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    if 'postal_code' not in body:
        raise APIException('Te falta añadir un código postal', status_code=400)
    if 'hourly_rate' not in body:
        raise APIException('Te falta añadir una tarifa por horas', status_code=400)
    
    print(body)
    pro_profile = Pro_profile(profile_pic=body["profile_pic"], description=body["description"], address=body["address"], postal_code=body["description"], phone_number=body["phone_number"], hourly_rate=body["hourly_rate"])
    db.session.add(pro_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil profesional ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/pro_profile/<int:id>', methods=['DELETE'])
def delete_pro_profile(id):
    print(id)

    pro_profile = Pro_profile.query.filter_by(id=id).first()
# # comprobamos que existe un PRO_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if pro_profile is None:
        raise APIException("No hay un perfil profesional con ese ID", status_code=404)

    db.session.delete(pro_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil profesional ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS CMR_PROFILE---------------
@api.route('/cmr_profile', methods=['GET'])
def get_cmr_profiles():

    results = Cmr_profile.query.all()
    cmr_profile_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /cmr_profile response ",
        "results": cmr_profile_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en CMR_PROFILE
@api.route('/cmr_profile/<int:id>', methods=['GET'])
def get_single_cmr_profile(id):
    print(id)

    cmr_profile = Cmr_profile.query.filter_by(id=id).first()
    print(cmr_profile)
# comprobamos que existe un CMR_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if cmr_profile is None:
        raise APIException("No hay un perfil cliente con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /cmr_profile response ",
        "result": cmr_profile.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CMR_PROFILE
@api.route('/cmr_profile', methods=['POST'])
def create_cmr_profile():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    
    print(body)
    cmr_profile = Cmr_profile(profile_pic=body["profile_pic"], description=body["description"], phone_number=body["phone_number"])
    db.session.add(cmr_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil cliente ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en CMR_PROFILE 
@api.route('/cmr_profile/<int:id>', methods=['DELETE'])
def delete_cmr_profile(id):
    print(id)

    cmr_profile = Cmr_profile.query.filter_by(id=id).first()
# # comprobamos que existe un CMR_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if cmr_profile is None:
        raise APIException("No hay un perfil cliente con ese ID", status_code=404)

    db.session.delete(cmr_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil profesional ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS PRO_USER_PROFILE-----------

@api.route('/pro_user_profile', methods=['GET'])
def get_pro_user_profile():

    results = Pro_user_profile.query.all()
    pro_user_profiles_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": pro_user_profiles_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion PRO_USER_PROFILE en concreto

@api.route('/pro_user_profile/<int:id>', methods=['GET'])
def get_single_pro_user_profile(id):
    print(id)

    pro_user_profile = Pro_user_profile.query.filter_by(id=id).first()
    print(pro_user_profile)
# comprobamos que existe un PRO_USER_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if pro_user_profile is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": pro_user_profile.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla PRO_USER_PROFILE
@api.route('/pro_user_profile', methods=['POST'])
def create_pro_user_profile():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'pro_profile_id' not in body:
        raise APIException('Te falta añadir un id de perfil profesional', status_code=400)
    if 'user_id' not in body:
        raise APIException('Te falta añadir un id de usuario', status_code=400)
    
    print(body)
    pro_user_profile = Pro_user_profile(pro_profile_id=body["pro_profile_id"], user_id=body["user_id"])
    db.session.add(pro_user_profile)
    db.session.commit()

    response_body = {
        "msg": "La relación pro_user_profile ha sido creado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS PRO_USER_PROFILE-----------

@api.route('/cmr_user_profile', methods=['GET'])
def get_cmr_user_profile():

    results = Cmr_user_profile.query.all()
    cmr_user_profiles_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": cmr_user_profiles_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion CMR_USER_PROFILE en concreto

@api.route('/cmr_user_profile/<int:id>', methods=['GET'])
def get_single_cmr_user_profile(id):
    print(id)

    cmr_user_profile = Cmr_user_profile.query.filter_by(id=id).first()
    print(cmr_user_profile)
# comprobamos que existe un CMR_USER_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if cmr_user_profile is None:
        raise APIException("No hay un cmr_user_profile con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /cmr_user_profile response ",
        "result": cmr_user_profile.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CMR_USER_PROFILE
@api.route('/cmr_user_profile', methods=['POST'])
def create_cmr_user_profile():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'cmr_user_profile' not in body:
        raise APIException('Te falta añadir un id de perfil cliente', status_code=400)
    if 'user_id' not in body:
        raise APIException('Te falta añadir un id de usuario', status_code=400)
    
    print(body)
    pro_user_profile = Cmr_user_profile(cmr_user_profile=body["cmr_user_profile"], user_id=body["user_id"])
    db.session.add(pro_user_profile)
    db.session.commit()

    response_body = {
        "msg": "La relación cmr_user_profile ha sido creada",
    }

    return jsonify(response_body), 200