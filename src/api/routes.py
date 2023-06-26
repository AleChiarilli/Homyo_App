"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Role, User_role, Pro_profile, Cmr_profile, Skill, Pro_profile_skill, Home,Habitant, Home_habitant, Room, Contract, Pro_review, Cmr_review, Message, Message_receiver
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from geopy.geocoders import Nominatim
import cloudinary

api = Blueprint('api', __name__)

# ÉSTA ES LA RUTA PARA SUBIR IMAGENES A CLOUDINARY

Cloud.config.update = ({
    'cloud_name':os.environ.get('CLOUDINARY_CLOUD_NAME'),
    'api_key': os.environ.get('CLOUDINARY_API_KEY'),
    'api_secret': os.environ.get('CLOUDINARY_API_SECRET')
})

@api.route("/upload", methods=['POST'])
def upload_file():
  api.logger.info('in upload route')

  cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
  upload_result = None
  if request.method == 'POST':
    file_to_upload = request.files['file']
    api.logger.info('%s file_to_upload', file_to_upload)
    if file_to_upload:
      upload_result = cloudinary.uploader.upload(file_to_upload)
      api.logger.info(upload_result)
      return jsonify(upload_result)

#  ÉSTA ES LA RUTA PARA LA OBTENCIÓN DE LOCALIZACIONES (NO BORRAR ÉSTE)
# https://alechiarilli-laughing-memory-pvvpx9v9wp9276xv-3001.preview.app.github.dev/api/pruebageopy
@api.route('/pruebageopy', methods=['POST'])
def handle_address_geopy():
    direction = request.json.get('direction', None)
    geolocator = Nominatim(user_agent="my_geocoder")
    location = geolocator.geocode(direction)
    latitude = location.latitude
    longitude = location.longitude

    return jsonify({'longitud':longitude, 'latitude':latitude}), 200

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
   # comprobamos si existe un usuario con ese email, si es asi, respondemos un mensaje de error 
    email = body["email"]
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException('Ese ya Email ya esta en uso', status_code=400)
    
    print(body)
    user = User(username=body["username"], email=body["email"], password=body["password"], profile_pic=body["profile_pic"])
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
# @jwt_required()
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
# @jwt_required()
def get_single_role(id):
    print(id)

    role = Role.query.filter_by(id=id).first()
    print(role)
# endpoint para crear un dato en tabla USER
@api.route('/role', methods=['POST'])
def create_role():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'name' not in body:
        raise APIException('Te falta añadir un nombre de usuario', status_code=400)
    
    print(body)
    role = Role(name=body["name"])
    db.session.add(role)
    db.session.commit()

    response_body = {
        "msg": "El usuario ha sido creado",
    }

    return jsonify(response_body), 200

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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
def create_pro_profile():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'user_id' not in body:
        raise APIException('Te falta añadir una id de usuario', status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    if 'postal_code' not in body:
        raise APIException('Te falta añadir un código postal', status_code=400)
    if 'hourly_rate' not in body:
        raise APIException('Te falta añadir una tarifa por horas', status_code=400)
    
    print(body)
    pro_profile = Pro_profile(user_id=body["user_id"], description=body["description"], address=body["address"], postal_code=body["postal_code"], phone_number=body["phone_number"], hourly_rate=body["hourly_rate"])
    db.session.add(pro_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil profesional ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/pro_profile/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
def delete_pro_profile(id):
    print(id)

    pro_profile = Pro_profile.query.filter_by(id=id).first()
# comprobamos que existe un PRO_PROFILE con ese id, si no es asi, respondemos un mensaje de error
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
# # @jwt_required()
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
# # @jwt_required()
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
# # @jwt_required()
def create_cmr_profile():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'user_id' not in body:
        raise APIException('Te falta añadir un id de usuario', status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    
    print(body)
    cmr_profile = Cmr_profile(user_id=body["user_id"], description=body["description"], phone_number=body["phone_number"])
    db.session.add(cmr_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil cliente ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en CMR_PROFILE 
@api.route('/cmr_profile/<int:id>', methods=['DELETE'])
# Acceso protegido
# # @jwt_required()
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

#----------------ENDPOINTS SKILLS-----------

@api.route('/skill', methods=['GET'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
def create_skill():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'name' not in body:
        raise APIException('Te falta añadir un skill', status_code=400)
    
    print(body)
    skill = Skill(name=body["name"])
    db.session.add(skill)
    db.session.commit()

    response_body = {
        "msg": "La skill ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/skill/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
def get_room():

    results = Room.query.all()
    room_list = list(map(lambda item: item.serialize(),results))
@api.route('/room/<int:id>', methods=['GET'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)

    
    print(body)
    room = Room(type=body["type"], size_sqm=body["size_sqm"], description=body["description"], home_id=body["home_id"])
    db.session.add(room)
    db.session.commit()

    response_body = {
        "msg": "La habitación ha sido creada",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en ROOM 
@api.route('/room/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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

#----------------ENDPOINTS CONTRACT-----------

@api.route('/contract', methods=['GET'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
    if 'job_status' not in body:
        raise APIException('Te falta añadir un estado del trabajo', status_code=400)
    if 'payment_status' not in body:
        raise APIException('Te falta añadir un estado del trabajo', status_code=400)
    if 'job_date' not in body:
        raise APIException('Te falta añadir una fecha', status_code=400)
    
    print(body)
    contract = Contract(pro_profile_id=body["pro_profile_id"],cmr_profile_id=body["cmr_profile_id"],job_status=body["job_status"], payment_status=body["payment_status"],job_date=body["job_date"], home_id=body["home_id"])
    db.session.add(contract)
    db.session.commit()

    response_body = {
        "msg": "La relación contrato ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en CONTRACT 
@api.route('/contract/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
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

#----------------ENDPOINTS PRO_REVIEW-----------

@api.route('/pro_review', methods=['GET'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
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

#----------------ENDPOINTS MESSAGE-----------

@api.route('/message', methods=['GET'])
# Acceso protegido
# @jwt_required()
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
# @jwt_required()
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
# @jwt_required()
def create_message():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'title' not in body:
        raise APIException('Te falta añadir un id de receptor', status_code=400)
    if 'content' not in body:
        raise APIException('Te falta añadir contenido', status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'sender_id' not in body:
        raise APIException('Te falta añadir un id emisor', status_code=400)
    if 'receiver_id' not in body:
        raise APIException('Te falta añadir un id receptor', status_code=400)
    
    print(body)
    message = Message(title=body["title"], message_current_status=body["message_current_status"], home_id=body["home_id"], content=body["content"], sender_id=body["sender_id"], receiver_id=body["receiver_id"])
    db.session.add(message)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en MESSAGE 
@api.route('/message/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
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

#----------------ENDPOINTS MESSAGE_receiver-----------

@api.route('/message_receiver', methods=['GET'])
# Acceso protegido
# @jwt_required()
def get_message_receiver():

    results = Message_receiver.query.all()
    message_receiver_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /message_receiver response ",
        "results": message_receiver_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion MESSAGE_RECEIVER en concreto

@api.route('/message_receiver/<int:id>', methods=['GET'])
# Acceso protegido
# @jwt_required()
def get_single_message_receiver(id):
    print(id)

    message_receiver = Message_receiver.query.filter_by(id=id).first()
    print(message_receiver)
# comprobamos que existe un MESSAGE con ese id, si no es asi, respondemos un mensaje de error
    if message_receiver is None:
        raise APIException("No hay un mensaje recibido con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /message_receiver response ",
        "result": message_receiver.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla MESSAGE_receiver
@api.route('/message_receiver', methods=['POST'])
# Acceso protegido
# @jwt_required()
def create_message_receiver():

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'message_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'receiver_id' not in body:
        raise APIException('Te falta añadir un id receptor', status_code=400)
    
    print(body)
    message = Message(message_id=body["message_id"], receiver_id=body["receiver_id"])
    db.session.add(message_receiver)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido enviado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en message_receiver 
@api.route('/message_receiver/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
def delete_message_receiver(id):
    print(id)

    message_receiver = Message_receiver.query.filter_by(id=id).first()
# # comprobamos que existe una MESSAGE con ese id, si no es asi, respondemos un mensaje de error
    if message_receiver is None:
        raise APIException("No hay un mensaje con ese ID", status_code=404)

    db.session.delete(message_receiver)
    db.session.commit()

    response_body = {
        "msg": "El mensaje ha sido borrado",
    }

