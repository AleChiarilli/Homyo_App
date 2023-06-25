"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Role, User_role, Pro_profile, Cmr_profile, Pro_user_profile, Cmr_user_profile, Skill, Pro_profile_skill, Home,Habitant, Home_habitant, Room, Home_room, Cmr_profile_home, Contract, Payment_status, Job_status, Pro_review, Cmr_review, Message, Message_received, Message_sent, Message_status
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from geopy.geocoders import Nominatim

api = Blueprint('api', __name__)

#  ÉSTA ES LA RUTA PARA LA OBTENCIÓN DE LOCALIZACIONES
# https://alechiarilli-laughing-memory-pvvpx9v9wp9276xv-3001.preview.app.github.dev/api/pruebageopy
# @api.route('/pruebageopy', methods=['POST'])
# def handle_address_geopy():
#     direction = request.json.get('direction', None)
#     geolocator = Nominatim(user_agent="my_geocoder")
#     location = geolocator.geocode(direction)
#     latitude = location.latitude
#     longitude = location.longitude

#     return jsonify({'longitud':longitude, 'latitude':latitude}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS---------------
#----------------ENDPOINTS USER---------------
# LOG IN para recibir token JWT

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    print(user)

    if user is None:
        return jsonify({"msg": "User does not exists"}), 404 
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401


    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

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
@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    print(id)

    user = User.query.filter_by(id=id).first()
# comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
    if user is None:
        raise APIException("No hay un usuario con ese ID", status_code=404)

    db.session.delete(user)
    db.session.commit()

    response_body = {
        "msg": "El usuario ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS ROLE---------------

@api.route('/role', methods=['GET'])
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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

# endpoint para BORRAR un dato en USER_ROLE 
@api.route('/user_role/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_user_role(id):
    print(id)

    user_role = User_role.query.filter_by(id=id).first()
# comprobamos que existe un user_role con ese id, si no es asi, respondemos un mensaje de error
    if user_role is None:
        raise APIException("No hay un user_role con ese ID", status_code=404)

    db.session.delete(user_role)
    db.session.commit()

    response_body = {
        "msg": "El user_role ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS PRO_PROFILE---------------
@api.route('/pro_profile', methods=['GET'])
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/pro_user_profile/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_pro_user_profile(id):
    print(id)

    pro_user_profile = Pro_user_profile.query.filter_by(id=id).first()
# # comprobamos que existe un PRO_USER_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if pro_user_profile is None:
        raise APIException("No hay un perfil profesional con ese ID", status_code=404)

    db.session.delete(pro_user_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil profesional ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS CMR_USER_PROFILE-----------

@api.route('/cmr_user_profile', methods=['GET'])
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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
# Acceso protegido
@jwt_required()
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

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/cmr_user_profile/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_cmr_user_profile(id):
    print(id)

    cmr_user_profile = Cmr_user_profile.query.filter_by(id=id).first()
# # comprobamos que existe un CMR_USER_PROFILE con ese id, si no es asi, respondemos un mensaje de error
    if cmr_user_profile is None:
        raise APIException("No hay un perfil cliente con ese ID", status_code=404)

    db.session.delete(cmr_user_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil cliente ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS SKILLS-----------

@api.route('/skill', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_skill():

    results = Skill.query.all()
    skills_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /skill response ",
        "results": skills_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion SKILL en concreto

@api.route('/skill/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_skill(id):
    print(id)

    skill = Skill.query.filter_by(id=id).first()
    print(skill)
# comprobamos que existe un SKILL con ese id, si no es asi, respondemos un mensaje de error
    if skill is None:
        raise APIException("No hay un skill/habilidad con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /skill response ",
        "result": skill.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CMR_USER_PROFILE
@api.route('/skill', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_skill():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'skill_id' not in body:
        raise APIException('Te falta añadir un id de skill', status_code=400)
    
    print(body)
    skill = Skill(skill_id=body["skill_id"])
    db.session.add(skill)
    db.session.commit()

    response_body = {
        "msg": "La relación cmr_user_profile ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/skill/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_skill(id):
    print(id)

    skill = Skill.query.filter_by(id=id).first()
# # comprobamos que existe un SKILL con ese id, si no es asi, respondemos un mensaje de error
    if skill is None:
        raise APIException("No hay un skill con ese ID", status_code=404)

    db.session.delete(skill)
    db.session.commit()

    response_body = {
        "msg": "El skill ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS PRO_PROFILE_SKILL-----------

@api.route('/pro_profile_skill', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_pro_profile_skill():

    results = Pro_profile_skill.query.all()
    pro_profile_skills_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": pro_profile_skills_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion PRO_PROFILE_SKILL en concreto

@api.route('/pro_profile_skill/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_pro_profile_skill(id):
    print(id)

    pro_profile_skill = Pro_user_profile.query.filter_by(id=id).first()
    print(pro_profile_skill)
# comprobamos que existe un PRO_PROFILE_SKILL con ese id, si no es asi, respondemos un mensaje de error
    if pro_profile_skill is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": pro_profile_skill.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla PRO_PROFILE_SKILL
@api.route('/pro_profile_skill', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_pro_profile_skill():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'pro_profile_id' not in body:
        raise APIException('Te falta añadir un id de perfil profesional', status_code=400)
    if 'skill_id' not in body:
        raise APIException('Te falta añadir un id de skill/habilidad', status_code=400)
    
    print(body)
    pro_profile_skill = Pro_user_profile(pro_profile_id=body["pro_profile_id"], skill_id=body["skill_id"])
    db.session.add(pro_profile_skill)
    db.session.commit()

    response_body = {
        "msg": "La relación pro_profile_skill ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE_SKILL 
@api.route('/pro_profile_skill/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_pro_profile_skill(id):
    print(id)

    pro_profile_skill = Pro_profile_skill.query.filter_by(id=id).first()
# # comprobamos que existe un PRO_PROFILE_SKILL con ese id, si no es asi, respondemos un mensaje de error
    if pro_profile_skill is None:
        raise APIException("No hay un pro_profile_skill con ese ID", status_code=404)

    db.session.delete(pro_profile_skill)
    db.session.commit()

    response_body = {
        "msg": "El pro_profile_skill ha sido borrado",
    }

#----------------ENDPOINTS HOME---------------
@api.route('/home', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home():

    results = Home.query.all()
    home_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /home response ",
        "results": home_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en HOME
@api.route('/home/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_home(id):
    print(id)

    home = Home.query.filter_by(id=id).first()
    print(home)
# comprobamos que existe un HOME con ese id, si no es asi, respondemos un mensaje de error
    if home is None:
        raise APIException("No hay una casa con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /home response ",
        "result": home.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla HOME
@api.route('/home', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_home():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'postal_code' not in body:
        raise APIException('Te falta añadir un código postal', status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)

    
    print(body)
    home = Home(postal_code=body["postal_code"], address=body["address"], description=body["description"])
    db.session.add(home)
    db.session.commit()

    response_body = {
        "msg": "La casa ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en HOME 
@api.route('/home/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_home(id):
    print(id)

    home = Home.query.filter_by(id=id).first()
# # comprobamos que existe un HOME con ese id, si no es asi, respondemos un mensaje de error
    if home is None:
        raise APIException("No hay una casa con ese ID", status_code=404)

    db.session.delete(home)
    db.session.commit()

    response_body = {
        "msg": "La casa ha sido borrada",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS HABITANT---------------
@api.route('/habitant', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_habitant():

    results = Habitant.query.all()
    habitants_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /habitant response ",
        "results": habitants_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en HABITANT
@api.route('/habitant/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_habitant(id):
    print(id)

    habitant = Habitant.query.filter_by(id=id).first()
    print(habitant)
# comprobamos que existe un HABITANT con ese id, si no es asi, respondemos un mensaje de error
    if habitant is None:
        raise APIException("No hay una casa con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /habitant response ",
        "result": habitant.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla HABITANT
@api.route('/habitant', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_habitant():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'type' not in body:
        raise APIException('Te falta añadir un tipo(anciano, niño, adulto, mascota)', status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)

    
    print(body)
    habitant = Habitant(type=body["type"], description=body["description"])
    db.session.add(habitant)
    db.session.commit()

    response_body = {
        "msg": "La casa ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en HABITANT 
@api.route('/habitant/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_habitant(id):
    print(id)

    habitant = Habitant.query.filter_by(id=id).first()
# # comprobamos que existe un HABITANT con ese id, si no es asi, respondemos un mensaje de error
    if habitant is None:
        raise APIException("No hay un habitante con ese ID", status_code=404)

    db.session.delete(habitant)
    db.session.commit()

    response_body = {
        "msg": "El habitante ha sido borrado",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS ROOM---------------
@api.route('/room', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_room():

    results = Room.query.all()
    room_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /room response ",
        "results": room_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en ROOM
@api.route('/room/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_room(id):
    print(id)

    room = Room.query.filter_by(id=id).first()
    print(room)
# comprobamos que existe un ROOM con ese id, si no es asi, respondemos un mensaje de error
    if room is None:
        raise APIException("No hay una casa con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /room response ",
        "result": room.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla ROOM
@api.route('/room', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_room():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'type' not in body:
        raise APIException('Te falta añadir un tipo(anciano, niño, adulto, mascota)', status_code=400)
    if 'size_sqm' not in body:
        raise APIException('Te falta añadir el tamaño en m2', status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)

    
    print(body)
    room = Room(type=body["type"], size_sqm=body["size_sqm"], description=body["description"])
    db.session.add(room)
    db.session.commit()

    response_body = {
        "msg": "La habitación ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en ROOM 
@api.route('/room/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_room(id):
    print(id)

    room = Room.query.filter_by(id=id).first()
# # comprobamos que existe un ROOM con ese id, si no es asi, respondemos un mensaje de error
    if room is None:
        raise APIException("No hay una casa con ese ID", status_code=404)

    db.session.delete(room)
    db.session.commit()

    response_body = {
        "msg": "La habitación ha sido borrada",
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS HOME_HABITANT-----------

@api.route('/home_habitant', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home_habitant():

    results = Home_habitant.query.all()
    home_habitants_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": home_habitants_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion HOME_HABITANT en concreto

@api.route('/home_habitant/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_home_habitant(id):
    print(id)

    home_habitant = Home_habitant.query.filter_by(id=id).first()
    print(home_habitant)
# comprobamos que existe un HOME_HABITANT con ese id, si no es asi, respondemos un mensaje de error
    if home_habitant is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": home_habitant.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla HOME_HABITANT
@api.route('/home_habitant', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_home_habitant():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'habitant_id' not in body:
        raise APIException('Te falta añadir un id de habitante', status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    
    print(body)
    home_habitant = Home_habitant(habitant_id=body["habitant_id"], home_id=body["home_id"])
    db.session.add(home_habitant)
    db.session.commit()

    response_body = {
        "msg": "La relación home_habitant ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en HOME_HABITANT 
@api.route('/home_habitant/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_home_habitant(id):
    print(id)

    home_habitant = Home_habitant.query.filter_by(id=id).first()
# # comprobamos que existe un home_habitant con ese id, si no es asi, respondemos un mensaje de error
    if home_habitant is None:
        raise APIException("No hay un home_habitant con ese ID", status_code=404)

    db.session.delete(home_habitant)
    db.session.commit()

    response_body = {
        "msg": "El home_habitant ha sido borrado",
    }

#----------------ENDPOINTS HOME_ROOM-----------

@api.route('/home_room', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home_room():

    results = Home_room.query.all()
    home_rooms_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": home_rooms_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion HOME_ROOM en concreto

@api.route('/home_room/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_home_room(id):
    print(id)

    home_room = Home_room.query.filter_by(id=id).first()
    print(home_room)
# comprobamos que existe un HOME_ROOM con ese id, si no es asi, respondemos un mensaje de error
    if home_room is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": home_room.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla HOME_ROOM
@api.route('/home_room', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_home_room():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'room_id' not in body:
        raise APIException('Te falta añadir un id de habitación', status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    
    print(body)
    home_room = Home_room(room_id=body["room_id"], home_id=body["home_id"])
    db.session.add(home_room)
    db.session.commit()

    response_body = {
        "msg": "La relación home_room ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en HOME_ROOM 
@api.route('/home_room/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_home_room(id):
    print(id)

    home_room = Home_room.query.filter_by(id=id).first()
# # comprobamos que existe un home_room con ese id, si no es asi, respondemos un mensaje de error
    if home_room is None:
        raise APIException("No hay un home_room con ese ID", status_code=404)

    db.session.delete(home_room)
    db.session.commit()

    response_body = {
        "msg": "El home_room ha sido borrado",
    }

#----------------ENDPOINTS CMR_PROFILE_HOME-----------

@api.route('/cmr_profile_home', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_cmr_profile_home():

    results = Cmr_profile_home.query.all()
    cmr_profile_homes_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": cmr_profile_homes_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion CMR_PROFILE_HOME en concreto

@api.route('/cmr_profile_home/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_cmr_profile_home(id):
    print(id)

    cmr_profile_home = Cmr_profile_home.query.filter_by(id=id).first()
    print(cmr_profile_home)
# comprobamos que existe un CMR_PROFILE_HOME con ese id, si no es asi, respondemos un mensaje de error
    if cmr_profile_home is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": cmr_profile_home.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CMR_PROFILE_HOME
@api.route('/cmr_profile_home', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_cmr_profile_home():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'cmr_profile_id' not in body:
        raise APIException('Te falta añadir un id de habitación', status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    
    print(body)
    cmr_profile_home = Cmr_profile_home(room_id=body["room_id"], home_id=body["home_id"])
    db.session.add(cmr_profile_home)
    db.session.commit()

    response_body = {
        "msg": "La relación cmr_profile_home ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en CMR_PROFILE_HOME 
@api.route('/cmr_profile_home/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_cmr_profile_home(id):
    print(id)

    cmr_profile_home = Cmr_profile_home.query.filter_by(id=id).first()
# # comprobamos que existe un cmr_profile_home con ese id, si no es asi, respondemos un mensaje de error
    if cmr_profile_home is None:
        raise APIException("No hay un cmr_profile_home con ese ID", status_code=404)

    db.session.delete(cmr_profile_home)
    db.session.commit()

    response_body = {
        "msg": "El cmr_profile_home ha sido borrado",
    }

#----------------ENDPOINTS CONTRACT-----------

@api.route('/contract', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_contract():

    results = Contract.query.all()
    contracts_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": contracts_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion CONTRACT en concreto

@api.route('/contract/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_contract(id):
    print(id)

    contract = Contract.query.filter_by(id=id).first()
    print(contract)
# comprobamos que existe un CONTRACT con ese id, si no es asi, respondemos un mensaje de error
    if contract is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": contract.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CONTRACT
@api.route('/contract', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_contract():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'pro_profile_id ' not in body:
        raise APIException('Te falta añadir un id de profesional', status_code=400)
    if 'cmr_profile_id' not in body:
        raise APIException('Te falta añadir un id de cliente', status_code=400)
    if 'job_current_status' not in body:
        raise APIException('Te falta añadir un estado del trabajo', status_code=400)
    if 'payment_current_status' not in body:
        raise APIException('Te falta añadir un estado del trabajo', status_code=400)
    if 'job_date' not in body:
        raise APIException('Te falta añadir una fecha', status_code=400)
    
    print(body)
    contract = Contract(pro_profile_id=body["pro_profile_id"],cmr_profile_id=body["cmr_profile_id"],job_current_status=body["job_current_status"], payment_current_status=body["payment_current_status"],job_date=body["job_date"], home_id=body["home_id"])
    db.session.add(contract)
    db.session.commit()

    response_body = {
        "msg": "La relación contrato ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en CONTRACT 
@api.route('/contract/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_contract(id):
    print(id)

    contract = Contract.query.filter_by(id=id).first()
# # comprobamos que existe un contrato con ese id, si no es asi, respondemos un mensaje de error
    if contract is None:
        raise APIException("No hay un contrato con ese ID", status_code=404)

    db.session.delete(contract)
    db.session.commit()

    response_body = {
        "msg": "El contrato ha sido borrado",
    }

#----------------ENDPOINTS JOB_STATUS---------------

@api.route('/job_status', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_job_statuss():

    results = Job_status.query.all()
    job_status_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /job_status response ",
        "results": job_status_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en JOB_STATUS

@api.route('/job_status/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_job_status(id):
    print(id)

    job_status = Job_status.query.filter_by(id=id).first()
    print(job_status)
# comprobamos que existe un JOB_STATUS con ese id, si no es asi, respondemos un mensaje de error
    if job_status is None:
        raise APIException("No hay un job_status con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /job_status response ",
        "result": job_status.serialize()
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS PAYMENT_STATUS---------------

@api.route('/payment_status', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_payment_status():

    results = Payment_status.query.all()
    payment_status_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /payment_status response ",
        "results": payment_status_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en PAYMENT_STATUS

@api.route('/payment_status/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_payment_status(id):
    print(id)

    payment_status = Payment_status.query.filter_by(id=id).first()
    print(payment_status)
# comprobamos que existe un PAYMENT_STATUS con ese id, si no es asi, respondemos un mensaje de error
    if payment_status is None:
        raise APIException("No hay un payment_status con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /payment_status response ",
        "result": payment_status.serialize()
    }

    return jsonify(response_body), 200

#----------------ENDPOINTS PRO_REVIEW-----------

@api.route('/pro_review', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_pro_review():

    results = Pro_review.query.all()
    pro_reviews_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": pro_reviews_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion PRO_REVIEW en concreto

@api.route('/pro_review/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_pro_review(id):
    print(id)

    pro_review = Pro_review.query.filter_by(id=id).first()
    print(pro_review)
# comprobamos que existe un PRO_REVIEW con ese id, si no es asi, respondemos un mensaje de error
    if pro_review is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": pro_review.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla PRO_REVIEW
@api.route('/pro_review', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_pro_review():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'rating' not in body:
        raise APIException('Te falta añadir una puntuacion', status_code=400)
    if 'pro_receiver_id' not in body:
        raise APIException('Te falta añadir un id de profesional', status_code=400)
    if 'cmr_sender_id' not in body:
        raise APIException('Te falta añadir un id de cliente', status_code=400)
    if 'contract_id' not in body:
        raise APIException('Te falta añadir un id de contrato', status_code=400)
    if 'comment' not in body:
        raise APIException('Te falta añadir un comentario', status_code=400)

    
    print(body)
    pro_review = Pro_review(rating=body["rating"],pro_receiver_id=body["pro_receiver_id"],cmr_sender_id=body["cmr_sender_id"],comment=body["comment"], contract_id=body["contract_id"])
    db.session.add(pro_review)
    db.session.commit()

    response_body = {
        "msg": "La relación opinión ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_REVIEW 
@api.route('/pro_review/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_pro_review(id):
    print(id)

    pro_review = Pro_review.query.filter_by(id=id).first()
# # comprobamos que existe una opinión con ese id, si no es asi, respondemos un mensaje de error
    if pro_review is None:
        raise APIException("No hay una opinión con ese ID", status_code=404)

    db.session.delete(pro_review)
    db.session.commit()

    response_body = {
        "msg": "La opinión ha sido borrada",
    }

#----------------ENDPOINTS CMR_REVIEW-----------

@api.route('/cmr_review', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_cmr_review():

    results = Cmr_review.query.all()
    cmr_reviews_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": cmr_reviews_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion CMR_REVIEW en concreto

@api.route('/cmr_review/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_cmr_review(id):
    print(id)

    cmr_review = Cmr_review.query.filter_by(id=id).first()
    print(cmr_review)
# comprobamos que existe un CMR_REVIEW con ese id, si no es asi, respondemos un mensaje de error
    if cmr_review is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": cmr_review.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CMR_REVIEW
@api.route('/cmr_review', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_cmr_review():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'rating' not in body:
        raise APIException('Te falta añadir una puntuacion', status_code=400)
    if 'pro_sender_id' not in body:
        raise APIException('Te falta añadir un id de profesional', status_code=400)
    if 'cmr_receiver_id' not in body:
        raise APIException('Te falta añadir un id de cliente', status_code=400)
    if 'contract_id' not in body:
        raise APIException('Te falta añadir un id de contrato', status_code=400)
    if 'comment' not in body:
        raise APIException('Te falta añadir un comentario', status_code=400)

    
    print(body)
    cmr_review = Cmr_review(rating=body["rating"],pro_sender_id=body["pro_sender_id"],cmr_receiver_id=body["cmr_receiver_id"],comment=body["comment"], contract_id=body["contract_id"])
    db.session.add(cmr_review)
    db.session.commit()

    response_body = {
        "msg": "La relación opinión ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en CMR_REVIEW 
@api.route('/cmr_review/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_cmr_review(id):
    print(id)

    cmr_review = Cmr_review.query.filter_by(id=id).first()
# # comprobamos que existe una opinión con ese id, si no es asi, respondemos un mensaje de error
    if cmr_review is None:
        raise APIException("No hay una opinión con ese ID", status_code=404)

    db.session.delete(cmr_review)
    db.session.commit()

    response_body = {
        "msg": "La opinión ha sido borrada",
    }

#----------------ENDPOINTS MESSAGE_RECEIVED-----------

@api.route('/message_received', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_message_received():

    results = Message_received.query.all()
    message_received_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /message_sent response ",
        "results": message_received_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion MESSAGE_RECEIVED en concreto

@api.route('/message_received/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_message_received(id):
    print(id)

    message_received = Message_received.query.filter_by(id=id).first()
    print(message_received)
# comprobamos que existe un MESSAGE_RECEIVED con ese id, si no es asi, respondemos un mensaje de error
    if message_received is None:
        raise APIException("No hay un mensaje recibido con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /message_received response ",
        "result": message_received.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla MESSAGE_RECEIVED
@api.route('/message_received', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_message_received():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'sender_id' not in body:
        raise APIException('Te falta añadir un id de receptor', status_code=400)
    if 'message_id' not in body:
        raise APIException('Te falta añadir un id de mensaje', status_code=400)
    
    print(body)
    message_received = Message_received(sender_id=body["sender_id"],message_id=body["message_id"])
    db.session.add(message_received)
    db.session.commit()

    response_body = {
        "msg": "La relación mensaje ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en MESSAGE_RECEIVED 
@api.route('/message_received/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_message_received(id):
    print(id)

    message_received = Message_received.query.filter_by(id=id).first()
# # comprobamos que existe una MESSAGE_RECEIVED con ese id, si no es asi, respondemos un mensaje de error
    if message_received is None:
        raise APIException("No hay un mensaje con ese ID", status_code=404)

    db.session.delete(message_received)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido borrado",
    }

#----------------ENDPOINTS MESSAGE-----------

@api.route('/message', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_message():

    results = Message.query.all()
    message_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /message_sent response ",
        "results": message_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion MESSAGE en concreto

@api.route('/message/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_message(id):
    print(id)

    message = Message.query.filter_by(id=id).first()
    print(message)
# comprobamos que existe un MESSAGE con ese id, si no es asi, respondemos un mensaje de error
    if message is None:
        raise APIException("No hay un mensaje recibido con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /message response ",
        "result": message.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla MESSAGE
@api.route('/message', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_message():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'title' not in body:
        raise APIException('Te falta añadir un id de receptor', status_code=400)
    if 'content' not in body:
        raise APIException('Te falta añadir un id de mensaje', status_code=400)
    if 'message_current_status' not in body:
        raise APIException('Te falta añadir un id de mensaje', status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de mensaje', status_code=400)
    
    print(body)
    message = Message(title=body["title"], message_current_status=body["message_current_status"], home_id=body["home_id"], content=body["content"])
    db.session.add(message)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en MESSAGE 
@api.route('/message/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_message(id):
    print(id)

    message = Message.query.filter_by(id=id).first()
# # comprobamos que existe una MESSAGE con ese id, si no es asi, respondemos un mensaje de error
    if message is None:
        raise APIException("No hay un mensaje con ese ID", status_code=404)

    db.session.delete(message)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido borrado",
    }

#----------------ENDPOINTS MESSAGE_SENT-----------

@api.route('/message_sent', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_message_sent():

    results = Message_sent.query.all()
    message_sents_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /message_sent response ",
        "results": message_sents_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion MESSAGE_SENT en concreto

@api.route('/message_sent/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_message_sent(id):
    print(id)

    message_sent = Message_sent.query.filter_by(id=id).first()
    print(message_sent)
# comprobamos que existe un MESSAGE_SENT con ese id, si no es asi, respondemos un mensaje de error
    if message_sent is None:
        raise APIException("No hay un mensaje recibido con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /message_sent response ",
        "result": message_sent.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla MESSAGE_SENT
@api.route('/message_sent', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_message_sent():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'receiver_id' not in body:
        raise APIException('Te falta añadir un id de receptor', status_code=400)
    if 'message_id' not in body:
        raise APIException('Te falta añadir un id de mensaje', status_code=400)
    
    print(body)
    message_sent = Message_sent(receiver_id=body["receiver_id"],message_id=body["message_id"])
    db.session.add(message_sent)
    db.session.commit()

    response_body = {
        "msg": "La relación mensaje ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en MESSAGE_SENT 
@api.route('/message_sent/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_message_sent(id):
    print(id)

    message_sent = Message_sent.query.filter_by(id=id).first()
# # comprobamos que existe una MESSAGE_SENT con ese id, si no es asi, respondemos un mensaje de error
    if message_sent is None:
        raise APIException("No hay un mensaje con ese ID", status_code=404)

    db.session.delete(message_sent)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido borrado",
    }

#----------------ENDPOINTS MESSAGE_STATUS-----------

@api.route('/message_status', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_message_status():

    results = Message_status.query.all()
    message_status_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /message_sent response ",
        "results": message_status_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion MESSAGE_STATUS en concreto

@api.route('/message_status/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_message_status(id):
    print(id)

    message_status = Message_status.query.filter_by(id=id).first()
    print(message_status)
# comprobamos que existe un MESSAGE_STATUS con ese id, si no es asi, respondemos un mensaje de error
    if message_status is None:
        raise APIException("No hay un mensaje recibido con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /message_status response ",
        "result": message_status.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla MESSAGE_STATUS
@api.route('/message_status', methods=['POST'])
# Acceso protegido
@jwt_required()
def message_status():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'status' not in body:
        raise APIException('Te falta añadir un id de receptor', status_code=400)
    
    print(body)
    message_status = Message_status(status=body["status"])
    db.session.add(message_status)
    db.session.commit()

    response_body = {
        "msg": "La relación mensaje ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en MESSAGE_STATUS 
@api.route('/message_status/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_message_status(id):
    print(id)

    message_status = Message_status.query.filter_by(id=id).first()
# # comprobamos que existe una MESSAGE_STATUS con ese id, si no es asi, respondemos un mensaje de error
    if message_status is None:
        raise APIException("No hay un mensaje con ese ID", status_code=404)

    db.session.delete(message_status)
    db.session.commit()

    response_body = {
        "msg": "El estado de mensaje ha sido borrado",
    }
