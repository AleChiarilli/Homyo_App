  
import os
from flask_admin import Admin
from .models import db, User, Role, User_role, Pro_profile, Skill, Pro_profile_skill, Cmr_profile, Home, Room, Habitant, Home_habitant, Contract, Cmr_review, Pro_review, Message, Message_receiver
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(User_role, db.session))
    admin.add_view(ModelView(Pro_profile, db.session))
    admin.add_view(ModelView(Skill, db.session))
    admin.add_view(ModelView(Pro_profile_skill, db.session))
    admin.add_view(ModelView(Cmr_profile, db.session))
    admin.add_view(ModelView(Home, db.session))
    admin.add_view(ModelView(Room, db.session))
    admin.add_view(ModelView(Habitant, db.session))
    admin.add_view(ModelView(Home_habitant, db.session))
    admin.add_view(ModelView(Contract, db.session))
    admin.add_view(ModelView(Cmr_review, db.session))
    admin.add_view(ModelView(Pro_review, db.session))
    admin.add_view(ModelView(Message, db.session))
    admin.add_view(ModelView(Message_receiver, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))