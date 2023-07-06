from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum
db = SQLAlchemy()
import unidecode

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_pic = db.Column(db.String, unique=False, nullable=True)
    username = db.Column(db.String(120), unique=False, nullable=False)
    surname1 = db.Column(db.String(120), unique=False, nullable=True)
    surname2 = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_roles = db.relationship('User_role', backref='user', lazy=True)
    pro_profile = db.relationship('Pro_profile', backref='user', lazy=True)
    cmr_profile = db.relationship('Cmr_profile', backref='user', lazy=True)
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False) 
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "profile_pic": self.profile_pic,
            "username": self.username,
            "surname1": self.surname1,
            "surname2": self.surname2,
            "email": self.email,
            "user_roles": list(map(lambda item:item.serialize(),self.user_roles)),
            "pro_profile": list(map(lambda item:item.serialize(),self.pro_profile)),
            "cmr_profile": list(map(lambda item:item.serialize(),self.cmr_profile)) # Add the pro_profile_id
            # do not serialize the password, its a security breach
        }

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Role {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
# Tabla auxiliar para enlazar rol(role) y usuario(user)
class User_role(db.Model):
    __tablename__="user_role"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship(Role)
    
    def __repr__(self):
        return f'<Role {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role.serialize()["name"],
            "user": self.user_id
        }
    
class Pro_profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # verified = db.Column(db.Boolean(), unique=False, nullable=False, default=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    dni = db.Column(db.String(255), unique=True, nullable=True)
    description = db.Column(db.String(255), unique=False, nullable=True)
    address = db.Column(db.String(200), unique=False, nullable=True)
    city = db.Column(db.String(200), unique=False, nullable=True)
    decode_city = db.Column(db.String(200), unique=False, nullable=True)
    postal_code = db.Column(db.String, unique=False, nullable=True)
    km_radius = db.Column(db.Numeric, unique=False, nullable=True)
    phone_number = db.Column(db.String, unique=False, nullable=True)
    hourly_rate = db.Column(db.Numeric, unique=False, nullable=True)
    skills = db.relationship('Pro_profile_skill', backref='pro_profile', lazy=True)


    def __repr__(self):
        return f'<Pro_profile {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description,
            #sin DNI por seguridad
            "address": self.address,
            "city": self.city,
            "postal_code": self.postal_code,
            "km_radius": self.km_radius,
            "phone_number": self.phone_number,
            "hourly_rate": self.hourly_rate,
            # "skills" : list(map(lambda item:item.serialize(),self.skills))
        }

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)

    def __repr__(self):
        return f'<Skill {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
# Tabla auxiliar para enlazar perfil(pro_profile) y habilidades(skills)
class Pro_profile_skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'))
    skill = db.relationship(Skill)
    pro_profile_id = db.Column(db.Integer, db.ForeignKey('pro_profile.id'))

    def __repr__(self):
        return f'<Pro_profile_skill {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "skills": self.skill.serialize(),
            "pro_profile_id": self.pro_profile.serialize()
        }
    
class Cmr_profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    description = db.Column(db.String(255), unique=False, nullable=True)
    phone_number = db.Column(db.String, unique=False, nullable=True)
    homes = db.relationship("Home", backref="cmr_profile", lazy=True)

    def __repr__(self):
        return f'<Cmr_profile {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description,
            "phone_number": self.phone_number,
            "homes": list(map(lambda item:item.serialize(),self.homes))
        }
    
class Home(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=True)
    address = db.Column(db.String(200), unique=False, nullable=True)
    city = db.Column(db.String(200), unique=False, nullable=True)
    postal_code = db.Column(db.Integer, unique=False, nullable=True)
    description = db.Column(db.String(255), unique=False, nullable=True)
    cmr_profile_id = db.Column(db.Integer, db.ForeignKey('cmr_profile.id'))
    posts = db.relationship("Home_Post", backref="home", lazy=True)
    decode_city = db.Column(db.String(200), unique=False, nullable=True)
    #aqui se modifico
    # def __init__(self):
    #     self.decode_city = unidecode.unidecode(self.city.replace(' ', '').replace('-', '').lower())

    def __repr__(self):
        return f'<Home {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "address": self.address,
            "city": self.city,
            "postal_code": self.postal_code,
            "description": self.description,
            "cmr_profile_id": self.cmr_profile_id,
            # "posts": list(map(lambda item:item.serialize(),self.posts)) # DEBERIA TRAER LOS POSTS DE LA CASA DA ERROR POR list(map(lambda item:item.serialize(),self.homes))
        }

class TimestampMixin(db.Model):
    __abstract__ = True
    created = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime(timezone=True), onupdate=datetime.utcnow)

class Home_Post(TimestampMixin,db.Model):
    __tablename__="home_post"
    id = db.Column(db.Integer, primary_key=True)
    is_visible = db.Column(db.Boolean(), unique=False, nullable=False, default=False)
    home_id = db.Column(db.Integer, db.ForeignKey('home.id'))
    description = db.Column(db.String(255), unique=False, nullable=False)
    latitude = db.Column(db.String(200), unique=False, nullable=False)
    longitude = db.Column(db.String(200), unique=False, nullable=False)
    starting_time = db.Column(db.DateTime)
    finishing_time = db.Column(db.DateTime)
    skills = db.relationship('Post_skills', backref='home_post', lazy=True)
    
    def __repr__(self):
        return f'<Home_Post {self.id}>'
    
    def calculate_time_difference(self):
        if self.starting_time and self.finishing_time:
            time_difference = self.finishing_time - self.starting_time
            return str(time_difference)

        return None
    

    def serialize(self):
        created = self.created.strftime("%d/%m/%Y %H:%M") if self.created else None
        updated = self.updated.strftime("%d/%m/%Y %H:%M") if self.updated else None
        starting_time = self.starting_time.strftime("%d/%m/%Y %H:%M") if self.starting_time else None
        finishing_time = self.finishing_time.strftime("%d/%m/%Y %H:%M") if self.finishing_time else None
        time_difference = self.calculate_time_difference()
        # self.decode_city = unidecode.unidecode(self.home.serialize()["city"].replace(' ', '').replace('-', '').lower())
        return {
            "id": self.id,
            "home_name":self.home.serialize()["name"],
            "home_address":self.home.serialize()["address"],
            "home_postal_code":self.home.serialize()["postal_code"],
            "home_city":self.home.serialize()["city"],
            "latitude": self.latitude,
            "longitude": self.longitude,
            "created": created,
            "updated": updated,
            "is_visible": self.is_visible,
            "description": self.description,
            "starting_time": starting_time,
            "finishing_time": finishing_time,
            "time_difference": time_difference,
            "cmr_profile_id": self.home.serialize()["cmr_profile_id"],
            "skills" : list(map(lambda item:item.serialize(),self.skills))
        }

class Post_skills(db.Model):
    __tablename__="post_skills"
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'))
    skill = db.relationship(Skill)
    homepost_id = db.Column(db.Integer, db.ForeignKey('home_post.id'))
    # home_post = db.relationship(Home_Post)

    def __repr__(self):
        return f'<Post_skills {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "skill":self.skill.serialize()["name"],
            "homepost_id": self.homepost_id
        }

class JobStatus(Enum):
    PENDING = 'Pending'
    ACTIVE = 'Active'
    COMPLETED = 'Completed'
    CANCELED = 'Canceled'

class PaymentStatus(Enum):
    PENDING = 'Pending'
    PAYED = 'Payed'
    REFUNDED = 'Refunded'


class Contract(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    home_id = db.Column(db.Integer, db.ForeignKey('home.id'))
    home = db.relationship(Home)
    pro_profile_id = db.Column(db.Integer, db.ForeignKey('pro_profile.id'))
    pro_profile = db.relationship(Pro_profile)
    cmr_profile_id = db.Column(db.Integer, db.ForeignKey('cmr_profile.id'))
    cmr_profile = db.relationship(Cmr_profile)
    job_status = db.Column(db.Enum(JobStatus), default=JobStatus.PENDING)
    payment_status = db.Column(db.Enum(PaymentStatus), default=PaymentStatus.PENDING)
    comment = db.Column(db.String(255), unique=False, nullable=True)
    starting_time = db.Column(db.DateTime, nullable=False)
    finishing_time = db.Column(db.DateTime, nullable=False)
    
    def __repr__(self):
        return f'<Contract {self.id}>'
    
    def calculate_time_difference(self):
        if self.starting_time and self.finishing_time:
            time_difference = self.finishing_time - self.starting_time
            return str(time_difference)

        return None

    def serialize(self):
        created = self.created.strftime("%d/%m/%Y %H:%M") if self.created else None
        updated = self.updated.strftime("%d/%m/%Y %H:%M") if self.updated else None
        starting_time = self.starting_time.strftime("%d/%m/%Y %H:%M") if self.starting_time else None
        finishing_time = self.finishing_time.strftime("%d/%m/%Y %H:%M") if self.finishing_time else None
        time_difference = self.calculate_time_difference()

        return {
            "id": self.id,
            "home_id": self.home.serialize(),
            "pro_profile_id": self.pro_profile.serialize(),
            "cmr_profile_id": self.cmr_profile.serialize(),
            "comment": self.comment,
            "created": created,
            "updated": updated,
            "payment_status": self.payment_status,
            "starting_time": starting_time,
            "finishing_time": finishing_time,
            "time_difference": time_difference
        }

class Pro_review(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, unique=False, nullable=False)
    pro_receiver_id = db.Column(db.Integer, db.ForeignKey('pro_profile.id'))
    pro_profile = db.relationship(Pro_profile)
    cmr_sender_id = db.Column(db.Integer, db.ForeignKey('cmr_profile.id'))
    cmr_profile = db.relationship(Cmr_profile)
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.id'))
    contract = db.relationship(Contract)
    comment = db.Column(db.String(255), unique=False, nullable=False)

    #chequear columnas pro_receiver

    def __repr__(self):
        return f'<Pro_review {self.id}>'

    def serialize(self):
        created = self.created.strftime("%d/%m/%Y %H:%M") if self.created else None
        
        return {
            "id": self.id,
            "rating": self.rating,
            "pro_receiver_id": self.pro_receiver.serialize(),
            "cmr_sender_id": self.cmr_sender.serialize(),
            "contract_id": self.contract.serialize(),
            "created": created,
            "comment": self.comment
        }

class Cmr_review(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, unique=False, nullable=False)
    pro_sender_id = db.Column(db.Integer, db.ForeignKey('pro_profile.id'))
    pro_profile = db.relationship(Pro_profile)
    cmr_receiver_id = db.Column(db.Integer, db.ForeignKey('cmr_profile.id'))
    cmr_profile = db.relationship(Cmr_profile)
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.id'))
    contract = db.relationship(Contract)
    comment = db.Column(db.String(255), unique=False, nullable=False)

#chequear columnas pro_sender

    def __repr__(self):
        return f'<Cmr_review {self.id}>'

    def serialize(self):
        created = self.created.strftime("%d/%m/%Y %H:%M") if self.created else None

        return {
            "id": self.id,
            "rating": self.rating,
            "created": created,
            "pro_sender_id": self.pro_sender.serialize(),
            "cmr_receiver_id": self.cmr_receiver.serialize(),
            "contract_id": self.contract.serialize(),
            "comment": self.comment
        }

class MessageStatus(Enum):
    DRAFT = 'Draft'
    SENT = 'SENT'
    
class Message(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), unique=False, nullable=False)
    content = db.Column(db.String(255), unique=False, nullable=False)
    message_status = db.Column(db.Enum(MessageStatus), default=MessageStatus.DRAFT)
    home_id = db.Column(db.Integer, db.ForeignKey('home.id'))
    home = db.relationship(Home)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)


    def __repr__(self):
        return f'<Message {self.id}>'

    def serialize(self):
        created = self.created.strftime("%d/%m/%Y %H:%M") if self.created else None

        return {
            "id": self.id,
            "home_id": self.home.serialize(),
            "title": self.rating,
            "content": self.content,
            "message_status": self.message_status,
            "sender_id": self.user.serialize(),
            "created": created
        }


class Message_receiver(TimestampMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('message.id'))
    message = db.relationship(Message)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)


    def __repr__(self):
        return f'<Message_receiver {self.id}>'

    def serialize(self):
        created = self.created.strftime("%d/%m/%Y %H:%M") if self.created else None
        return {
            "id": self.id,
            "created": created,
            "message_id": self.message_id,
            "receiver_id": self.user.serialize(),
        }