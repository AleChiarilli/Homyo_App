"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Role, User_role, Pro_profile, Cmr_profile, Skill, Pro_profile_skill, Home, Home_Post, Contract, Pro_review, Cmr_review, Message, Message_receiver, Post_skills, Contract_skills, JobStatus, PaymentStatus
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from geopy.geocoders import Nominatim
import unidecode

# import cloudinary

api = Blueprint('api', __name__)

# ÉSTA ES LA RUTA PARA SUBIR IMAGENES A CLOUDINARY

# Cloud.config.update = ({
#     'cloud_name':os.environ.get('CLOUDINARY_CLOUD_NAME'),
#     'api_key': os.environ.get('CLOUDINARY_API_KEY'),
#     'api_secret': os.environ.get('CLOUDINARY_API_SECRET')
# })

# @api.route("/upload", methods=['POST'])
# def upload_file():
#   api.logger.info('in upload route')

#   cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
#     api_secret=os.getenv('API_SECRET'))
#   upload_result = None
#   if request.method == 'POST':
#     file_to_upload = request.files['file']
#     api.logger.info('%s file_to_upload', file_to_upload)
#     if file_to_upload:
#       upload_result = cloudinary.uploader.upload(file_to_upload)
#       api.logger.info(upload_result)
#       return jsonify(upload_result)

#  ÉSTA ES LA RUTA PARA LA OBTENCIÓN DE LOCALIZACIONES (NO BORRAR ÉSTE)
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


# RUTA DE PRUEBA
@api.route('/publications/<postal_code>', methods=['GET'])
def get_publications(postal_code):
    publications = Home.query.filter_by(postal_code=postal_code).all()

    # Convert the list of publications to a dictionary representation
    publications_dict = [publication.to_dict() for publication in publications]

    # Create a JSON response with the publications
    response = jsonify(publications=publications_dict)

    # Optionally, you can set the response headers if needed
    # response.headers['Header-Name'] = 'Header-Value'

    return response

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
    # print(user.serialize())
    

    if user is None:
        return jsonify({"msg": "User does not exists"}), 404 
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401


    access_token = create_access_token(identity=email)

    response_body = {
        "token": access_token,
        "user": user.serialize(),
    } 
    print(response_body)
    return jsonify(response_body)

@api.route('/user', methods=['GET'])
def get_users():

    results = User.query.all()
    users_list = [result.serialize() for result in results]


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
    user = User(username=body["username"], email=body["email"], password=body["password"]) #quitamos surname1 y 2, y profile_pictures porque no se utilizan en el formulario de registro.
    db.session.add(user)
    db.session.commit()

    # Assign the user role
    role_name = body['role_name'] #cambiamos la busqueda de role_id por role_name para tenerlo en el admin. con nombre en lugar de numero de id.(si se deja por id el problema estaria en que 1 persona puede registrar al profesional primero y este tendria el id 1, pero otro compañero puede resgitrar primero al cliente, por ende ahora el cliente en su proyecto estaria con el  con id 1) 
    role = Role.query.filter_by(name=role_name).first()
    if role:
        user_role = User_role(user=user, role=role)
        db.session.add(user_role)
        db.session.commit() #se agrega el commit para guardar. 


    # Add the user to the session and commit the changes to the database
    #se elimina la linea 179 porque estaba duplicada

    # Create an empty Pro_profile for the new user
    new_pro_profile = Pro_profile(user_id=user.id)

    # Add the empty Pro_profile to the session
    db.session.add(new_pro_profile)
    db.session.commit()

    # Create an empty Pro_profile for the new user
    new_cmr_profile = Cmr_profile(user_id=user.id)

    # Add the empty Pro_profile to the session
    db.session.add(new_cmr_profile)
    db.session.commit()


    #cmr_profile = CMR_profile(zip= null, user_id: user.id)
    #crear tambien con el mismo ID, aunque este vacio los datos (en null)! el usuario en las otras tablas
    #rol por defecto va a ser cliente
    response_body = {
        "msg": "El usuario ha sido creado",
        "new_user": user.serialize()
    }

    return jsonify(response_body), 200

#edicion de user

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return 'Usuario no encontrado', 404

    # Retrieve the data to update from the request body
    data = request.json

    # Update the user attributes
    user.profile_pic = data.get('profile_pic', user.profile_pic)
    user.username = data.get('username', user.username)
    user.surname1 = data.get('surname1', user.surname1)
    user.surname2 = data.get('surname2', user.surname2)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)

    db.session.commit()

    response_body = {
        "msg": "El usuario ha sido editado con éxito",
        "New data": user.serialize()
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
# endpoint para crear un dato en tabla ROL
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
    print(user_roles_list)

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
@api.route('/pro_profile_list', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_pro_profiles():

    results = Pro_profile.query.all()
    pro_profile_list = list(map(lambda item: item.serialize(),results))

     # Filter the query based on the city parameter if it exists
    # query = Pro_profile.query
    # if city:
    #     query = query.filter_by(Pro_profile.city.ilike(f'%{city}%')).all()

    response_body = {
        "msg": "Hello, this is your GET /pro_profile response ",
        "results": pro_profile_list
    }

    return jsonify(response_body), 200

# endpoint para consultar un dato en PRO_PROFILE
@api.route('/pro_profile', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_pro_profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()

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
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    if 'address' not in body:
        raise APIException('Te falta añadir una direccion', status_code=400)
    if 'city' not in body:
        raise APIException('Te falta añadir un código postal', status_code=400)

    data = request.json
    email = data.get('dni')

    # Check if the DNI already exists in the database
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException('DNI en uso/ya registrado con otro perfil')

    pro_profile = Pro_profile(user_id=body["user_id"], dni=body["dni"], description=body["description"], address=body["address"], city=body["city"], km_radius=body["km_radius"], postal_code=body["postal_code"], phone_number=body["phone_number"], hourly_rate=body["hourly_rate"],)
    db.session.add(pro_profile)
    db.session.commit()

    response_body = {
        "msg": "El perfil profesional ha sido creado",
        # "pro_profile_created": pro_profile
    }

    return jsonify(response_body), 200

# enpoint para editar datos en PRO_PROFILE

@api.route('/pro_profile/', methods=['PUT'])
@jwt_required()
def update_pro_profile():


    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()

    # comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
    if pro_profile is None:
        raise APIException("No hay un perfil profesional con ese ID", status_code=404)
    if not pro_profile:
        return 'Pro_profile not found', 404
    
    #adición de rol profesional no funca
    # role_id = 1
    # role = Role.query.get(role_id)
    # if role:
    #     user_role = User_role(user=user, role=role)
    #     db.session.add(user_role)
    #     db.session.commit()
        
    # Retrieve the data to update from the request body
    data = request.json
    seleccionados = list(set(data["seleccionados"]))

    for skill in seleccionados:
        new_skill = Pro_profile_skill(skill_id = skill, pro_profile_id = pro_profile.id)
        db.session.add(new_skill)
        db.session.commit()

    skills = Pro_profile_skill.query.filter_by(pro_profile_id=pro_profile.id).all()

    # Update the user attributes
    pro_profile.dni = data.get('dni', pro_profile.dni)
    pro_profile.description = data.get('description', pro_profile.description)
    pro_profile.address = data.get('address', pro_profile.address)
    pro_profile.city = data.get('city', pro_profile.city)
    pro_profile.postal_code = data.get('postal_code', pro_profile.postal_code)
    pro_profile.km_radius = data.get('km_radius', pro_profile.km_radius)
    pro_profile.phone_number = data.get('phone_number', pro_profile.phone_number)
    pro_profile.hourly_rate = data.get('hourly_rate', pro_profile.hourly_rate)

    db.session.commit()
    response_data = pro_profile.serialize()
    response_data["skills"] = [skill.serialize() for skill in skills]
    # role_id = 1
    # user_role = User_role(user=user.id, role=role_id)
    # db.session.add(user_role)

    response_body = {
        "msg": "El perfil profesional ha sido editado con éxito",
        "New data": response_data
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE 
@api.route('/pro_profile/<int:id>', methods=['DELETE'])
# Acceso protegido
# @jwt_required()
def delete_pro_profile():
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
# @api.route('/cmr_profile', methods=['GET'])
# # Acceso protegido
# # # @jwt_required()
# def get_cmr_profiles():

#     results = Cmr_profile.query.all()
#     cmr_profile_list = list(map(lambda item: item.serialize(),results))


#     response_body = {
#         "msg": "Hello, this is your GET /cmr_profile response ",
#         "results": cmr_profile_list
#     }

#     return jsonify(response_body), 200

# endpoint para consultar un dato en CMR_PROFILE
@api.route('/cmr_profile', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_cmr_profile():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
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
#edicion de CMR_PROFILE

@api.route('/cmr_profile', methods=['PUT'])
@jwt_required()
def update_cmr_profile():
    
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()

    # comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
    if cmr_profile is None:
        raise APIException("No hay un perfil cliente con ese ID", status_code=404)
    if not cmr_profile:
        return 'cmr_profile not found', 404

    # Retrieve the data to update from the request body
    data = request.json

    # Update the cmr_profile attributes
    cmr_profile.description = data.get('description', cmr_profile.description)
    cmr_profile.phone_number = data.get('phone_number', cmr_profile.phone_number)

    db.session.commit()

    response_body = {
        "msg": "El perfil cliente ha sido editado con éxito",
        "New data": cmr_profile.serialize()
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


#ruta para encontrar mis funciones en mi perfil profesional
@api.route('/my_pro_profile_skill_list', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_pro_profile_skill():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()
    pro_skills = Pro_profile_skill.query.filter_by(pro_profile_id=pro_profile.id).all()

    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": [skill.serialize() for skill in pro_skills]
    }

    return jsonify(response_body), 200

#enpoint de una relacion PRO_PROFILE_SKILL en concreto

@api.route('/pro_profile_skill/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_pro_profile_skill(id):
    print(id)

    pro_profile_skill = Pro_profile_skill.query.filter_by(id=id).first()
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

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'skill_name' not in body:
        raise APIException('Te falta añadir de skill/habilidad', status_code=400)

    skill_name = body['skill_name'] #se envia skill por nombre 
    skill = Skill.query.filter_by(name=skill_name).first() #se busca skill para añadir a profile skill
    print(skill)
    
    print(body)
    pro_profile_skill = Pro_profile_skill(pro_profile_id=pro_profile.id, skill=skill)
    db.session.add(pro_profile_skill)
    db.session.commit()

    response_body = {
        "msg": "La relación pro_profile_skill ha sido creado",
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en PRO_PROFILE_SKILL 
@api.route('/pro_profile_skill/<string:skill_name>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_pro_profile_skill(skill_name):

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()

    skill_name = skill_name #se envia skill por nombre en ruta
    skill = Skill.query.filter_by(name=skill_name).first() #se busca skill para añadir a profile skill
    pro_profile_skills = Pro_profile_skill.query.filter_by(pro_profile_id=pro_profile.id).all()
    pro_profile_skill = pro_profile_skills.query.filter_by(skill_id=skill.id).first()

    db.session.delete(pro_profile_skill)
    db.session.commit()

    response_body = {
        "msg": "El pro_profile_skill ha sido borrado"
    }

    return jsonify(response_body), 200
#----------------ENDPOINTS HOME---------------
@api.route('/homes', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
    results = Home.query.filter_by(cmr_profile_id=cmr_profile.id).all() 
    print("-----------------------------------------", results)
    home_list = [result.serialize() for result in results]
    print(home_list)

    response_body = {
        "msg": "Hello, this is your GET /home response ",
        "results": home_list
    }

    return jsonify(response_body), 200

@api.route('/home_post_list', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home_post_list():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
    home = Home.query.filter_by(cmr_profile_id=cmr_profile.id).first()
    home_posts = Home_Post.query.filter_by(home_id=home.id).all()

    print(home_posts)
    home_posts = [post.serialize() for post in home_posts]


    response_body = {
        "msg": "Hello, this is your GET /home response",
        "results": home_posts
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
@jwt_required()
def create_home():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))
    print(body)
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'nameSpace' not in body:
        raise APIException('Te falta añadir un nombre de sitio', status_code=400)
    if 'DescriptionSpace' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    if 'nameCity' not in body:
        raise APIException('Te falta añadir una ciudad', status_code=400)
    if 'postalCodeSpace' not in body:
        raise APIException('Te falta añadir un código postal', status_code=400)
    if 'addressSpace' not in body:
        raise APIException('Te falta añadir una dirección', status_code=400)

    
    print(body)
    # decode_city = unidecode.unidecode(body["nameCity"].replace(' ', '').replace('-', '').lower())

    home = Home(name=body["nameSpace"], city=body["nameCity"], postal_code=body["postalCodeSpace"], address=body["addressSpace"], description=body["DescriptionSpace"], cmr_profile_id=cmr_profile.id,
                # decode_city=decode_city
                )
    print(home)
    db.session.add(home)
    db.session.commit()

    response_body = {
        "msg": "La casa ha sido creada",
        "casa": home.serialize()
    }

    return jsonify(response_body), 200

#ENDPOINT EDICION HOME
@api.route('/home', methods=['PUT'])
@jwt_required()
def update_home():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
    homes = Home.query.filter_by(cmr_profile_id=cmr_profile.id).all() 
    home = Home.query.filter_by(name=homes.name).first()   

    # comprobamos que existe una casa con ese id, si no es asi, respondemos un mensaje de error
    if home is None:
        raise APIException("No hay una casa con ese ID", status_code=404)
    if not home:
        return 'home not found', 404

    # Retrieve the data to update from the request body
    data = request.json

    # Update the home attributes
    home.name = data.get('name', home.name)
    home.description = data.get('description', home.description)
    home.city = data.get('city', home.city)
    home.postal_code = data.get('postal_code', home.postal_code)
    home.address = data.get('address', home.address)

    db.session.commit()

    response_body = {
        "msg": "La casa ha sido editada con éxito",
        "New data": home.serialize()
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

#----------------ENDPOINTS HOME_POST-----------

@api.route('/home_post', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home_post():

    results = Home_Post.query.all()
    home_posts_list = list(map(lambda item: item.serialize(),results))
    print(home_posts_list)

    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": home_posts_list
    }

    return jsonify(response_body), 200

# RUTA PARA HACER BÚSQUEDAS DE CASAS POR CIUDADES
# ÉSTA HAY QUE TERMINAR CON JOSE
@api.route('/home_post/<city>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_home_post_city(city):
    print(city)
    # city = unidecode.unidecode(city.replace(' ', '').replace('-', '').lower())
    home_list = Home.query.filter_by(decode_city = city).all()
    print(home_list)
    results = []
    for home in home_list:
        homes = Home_Post.query.filter_by(home_id = home.id).first()
        results.append(homes)
    home_posts_list = list(map(lambda item: item.serialize(),results))
    print(results)
    print(home_posts_list)

    response_body = {
        "msg": "Hello, this is your GET /home_post/<city> response ",
        "results": home_posts_list
    }

    return jsonify(response_body), 200

#enpoint de una relacion home_post en concreto

@api.route('/home_post/<int:id>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_home_post(id):
    print(id)

    home_post = Home_Post.query.filter_by(id=id).first()
    print(home_post)
    
# comprobamos que existe un HOME_POST con ese id, si no es asi, respondemos un mensaje de error
    if home_post is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": home_post.serialize()
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla HOME_POST
@api.route('/home_post', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_home_post():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'home_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'description' not in body:
        raise APIException('Te falta añadir una descripción', status_code=400)
    
    home = Home.query.filter_by(id=body["home_id"]).first()

    geolocator = Nominatim(user_agent="my_geocoder")
    location = geolocator.geocode(f'{home.address} {home.city} {home.postal_code} , España')

    if location is None:
        raise APIException('Sé más específico con tu dirección por favor', status_code=400)
    
    latitude = location.latitude
    longitude = location.longitude
    print(latitude, longitude)

    print(body)
    home_post = Home_Post(home_id=home.id, description=body["description"], latitude=latitude, longitude=longitude, starting_time=body["starting_time"], finishing_time=body["finishing_time"])
    db.session.add(home_post)
    db.session.commit()

    skill_name = body.get("skill_name")
    skill = Skill.query.filter_by(name=skill_name).first() #se busca skill para añadir a profile skill
    if skill:
        post_skills = Post_skills(home_post=home_post, skill=skill)
    
        db.session.add(post_skills)
        db.session.commit() #se agrega el commit para guardar.

    response_body = {
        "msg": "Tu nuevo anuncio ha sido creado",
        "your_new_post": home_post.serialize()
    }

    return jsonify(response_body), 200
# enpoint editar HOME_POST -------------------NO USAR----------------
@api.route('/home_post/<int:id>', methods=['PUT'])
@jwt_required()
def update_home_post(id):
    
    home_post = Home_Post.query.filter_by(id=id).first()

    # comprobamos que existe un anuncio con ese id, si no es asi, respondemos un mensaje de error
    if home_post is None:
        raise APIException("No hay un anuncio con ese ID", status_code=404)
    if not home_post:
        return 'home_post not found', 404

    # Retrieve the data to update from the request body
    data = request.json

    # Update the home attributes
    home_post.description = data.get('description', home_post.description)
    home_post.latitude = data.get('latitude', home_post.latitude)
    home_post.is_visible = data.get('is_visible', home_post.is_visible)
    home_post.longitude = data.get('longitude', home_post.longitude)
    home_post.starting_time = data.get('starting_time', home_post.starting_time)
    home_post.finishing_time = data.get('finishing_time', home_post.finishing_time)

    db.session.commit()

    response_body = {
        "msg": "El perfil cliente ha sido editado con éxito",
        "New data": home_post.serialize()
    }

    return jsonify(response_body), 200

# endpoint para BORRAR un dato en HOME_POST 
@api.route('/home_post/<int:id>', methods=['DELETE'])
# Acceso protegido
@jwt_required()
def delete_home_post(id):
    print(id)

    home_post = Home_Post.query.filter_by(id=id).first()
# # comprobamos que existe un anuncio con ese id, si no es asi, respondemos un mensaje de error
    if home_post is None:
        raise APIException("No hay un contrato con ese ID", status_code=404)

    db.session.delete(home_post)
    db.session.commit()

    response_body = {
        "msg": "El home_post ha sido borrado",
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

#enpoint de una lista para contracts como pro_profile

@api.route('/my_contracts_pro', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_my_contracts_pro():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()
    pro_contracts = Contract.query.filter_by(pro_profile_id=pro_profile.id).all()

    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": [contract.serialize() for contract in pro_contracts]
    }

    return jsonify(response_body), 200

#enpoint de una lista para contracts como cmr_profile

@api.route('/my_contracts_cmr', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_my_contracts_cmr():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
    cmr_contracts = Contract.query.filter_by(cmr_profile_id=cmr_profile.id).all()

    response_body = {
        "msg": "Hello, this is your GET /pro_user_profile response ",
        "results": [contract.serialize() for contract in cmr_contracts]
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CONTRACT como Profesional
@api.route('/contract_pro_to_cmr', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_contract_pro_cmr():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()
    
    body = json.loads(request.data)
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'home_post_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'total_price' not in body:
        raise APIException('Te falta añadir precio total', status_code=400)
    
    home_post = Home_Post.query.filter_by(id=body["home_post_id"]).first()
    home = Home.query.filter_by(id=home_post.home_id).first()
    print(body)
    contract = Contract(posted_by=user.id, pro_profile_id=pro_profile.id, cmr_profile_id=home.cmr_profile_id, comment=home_post.description, finishing_time=home_post.finishing_time, starting_time=home_post.starting_time, home_id=home.id, hourly_rate=pro_profile.hourly_rate, total_price=body["total_price"])
    db.session.add(contract)
    db.session.commit()
    skill_name = body.get("skill_name")
    skill = Skill.query.filter_by(name=skill_name).first() #se busca skill para añadir a profile skill
    if skill:
        post_skills = Contract_skills(contract=contract, skill=skill)
        db.session.add(post_skills)
        db.session.commit() #se agrega el commit para guardar.
    response_body = {
        "msg": "La relación contrato ha sido creado",
        "your_new_contract": contract.serialize()
    }
    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CONTRACT como Cliente
@api.route('/contract_cmr_to_pro', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_contract_cmr_pro():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
    body = json.loads(request.data)
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'home_post_id' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'pro_profile_id' not in body:
        raise APIException('Te falta añadir un id de perfil profesional', status_code=400)
    if 'comment' not in body:
        raise APIException('Te falta añadir un id de casa', status_code=400)
    if 'total_price' not in body:
        raise APIException('Te falta añadir precio total', status_code=400)
    if 'starting_time' not in body:
        raise APIException('Te falta añadir hora de inicio', status_code=400)
    if 'finishing_time' not in body:
        raise APIException('Te falta añadir hora de inicio', status_code=400)
    
    pro_profile = Pro_profile.query.filter_by(id=body["pro_profile_id"]).first()
    
    home_post = Home_Post.query.filter_by(id=body["home_post_id"]).first()
    home = Home.query.filter_by(id=home_post.home_id).first()
    print(body)
    contract = Contract(posted_by=user.id, pro_profile_id=pro_profile.id, cmr_profile_id=cmr_profile.id, comment=body["comment"], finishing_time=body["finishing_time"], starting_time=body["starting_time"], home_id=body["home_id"], hourly_rate=pro_profile.hourly_rate, total_price=body["total_price"])
    db.session.add(contract)
    db.session.commit()
    skill_name = body.get("skill_name")
    skill = Skill.query.filter_by(name=skill_name).first() #se busca skill para añadir a profile skill
    if skill:
        post_skills = Contract_skills(contract=contract, skill=skill)
        db.session.add(post_skills)
        db.session.commit() #se agrega el commit para guardar.
    response_body = {
        "msg": "La relación contrato ha sido creado",
        "your_new_contract": contract.serialize()
    }
    return jsonify(response_body), 200
# edición de contrato

@api.route('/contract/<int:id>', methods=['PUT'])
@jwt_required()
def update_cmr_contract(id):

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    contract = Contract.query.get(id)

    # comprobamos que existe un usuario con ese id, si no es asi, respondemos un mensaje de error
    if contract is None:
        raise APIException("No hay un contrato con ese ID", status_code=404)

    # comprobamos si esta intentando actualizar el estado el mismo que creo el contrato, respondemos un mensaje de error
    if contract.posted_by == user.id:
        raise APIException("No tienes permiso para cambiar el estado de este contrato", status_code=403)

     # Retrieve the data to update from the request body
    data = request.json

    # Update the contract attributes
    job_status = data.get('job_status')
    payment_status = data.get('payment_status')

    # Check if job_status is provided and valid
    if job_status is not None and job_status not in [status.name for status in JobStatus]:
        raise APIException("Estado de trabajo inválido", status_code=400)

    # Check if payment_status is provided and valid
    if payment_status is not None and payment_status not in [status.name for status in PaymentStatus]:
        raise APIException("Estado de pago inválido", status_code=400)

    # Update the cmr_profile attributes
    contract.job_status = data.get('job_status', contract.job_status)
    contract.payment_status = data.get('payment_status', contract.payment_status)

    db.session.commit()

    response_body = {
        "msg": "El ha actualizado su estado",
        "New data": contract.serialize()
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

@api.route('/my_pro_review', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_single_pro_review():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()
    pro_reviews = Pro_review.query.filter_by(pro_receiver_id=pro_profile.id).all()

# comprobamos que existe un PRO_REVIEW con ese id, si no es asi, respondemos un mensaje de error
    if pro_reviews is None:
        raise APIException("No hay un usuario_rol con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response",
        "result": [review.serialize() for review in pro_reviews]
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla PRO_REVIEW
@api.route('/pro_review', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_pro_review():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()

    body = json.loads(request.data)
    # json.loads(request.body.decode(encoding='UTF-8'))

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'rating' not in body:
        raise APIException('Te falta añadir una puntuacion', status_code=400)
    if 'pro_receiver_id' not in body:
        raise APIException('Te falta añadir un id de profesional', status_code=400)
    if 'contract_id' not in body:
        raise APIException('Te falta añadir un id de contrato', status_code=400)
    if 'comment' not in body:
        raise APIException('Te falta añadir un comentario', status_code=400)

    
    print(body)
    pro_review = Pro_review(rating=body["rating"],pro_receiver_id=body["pro_receiver_id"],cmr_sender_id=cmr_profile.id,comment=body["comment"], contract_id=body["contract_id"])
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

@api.route('/my_cmr_reviews>', methods=['GET'])
# Acceso protegido
@jwt_required()
def get_cmr_reviews():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    cmr_profile = Cmr_profile.query.filter_by(user_id=user.id).first()
    cmr_reviews = Cmr_review.query.filter_by(cmr_receiver_id=cmr_profile.id).all()

# comprobamos que existe un CMR_REVIEW con ese id, si no es asi, respondemos un mensaje de error
    if cmr_reviews is None:
        raise APIException("No hay opiniones con ese ID", status_code=404)


    response_body = {
        "msg": "Hello, this is your SINGLE GET /pro_user_profile response ",
        "result": [review.serialize() for review in cmr_reviews]
    }

    return jsonify(response_body), 200

# endpoint para crear un dato en tabla CMR_REVIEW
@api.route('/cmr_review', methods=['POST'])
# Acceso protegido
@jwt_required()
def create_cmr_review():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    pro_profile = Pro_profile.query.filter_by(user_id=user.id).first()

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
    cmr_review = Cmr_review(rating=body["rating"],pro_sender_id=pro_profile.id,cmr_receiver_id=body["cmr_receiver_id"],comment=body["comment"], contract_id=body["contract_id"])
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
@jwt_required()
def create_message():

    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

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
    if 'receiver_id' not in body:
        raise APIException('Te falta añadir un id receptor', status_code=400)
    
    print(body)
    message = Message(title=body["title"], message_current_status=body["message_current_status"], home_id=body["home_id"], content=body["content"], sender_id=user.id, receiver_id=body["receiver_id"])
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
    message_receiver = Message(message_id=body["message_id"], receiver_id=body["receiver_id"])
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
    
# Proteja una ruta con jwt_required, que eliminará las solicitudes
# sin un JWT válido presente.
@api.route("/valide-token", methods=["GET"])
@jwt_required()
def get_info_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    #user = User.query.filter_by(email=current_user).first()

    return jsonify({"isLogged":True}), 200