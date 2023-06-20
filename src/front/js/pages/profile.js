import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Valoraciones } from "../component/valoraciones";
import { Calendar } from "../component/calendar";
import { Post_add } from "../component/post_add"
import { Modify_profile } from "../component/modify_profile"



export const Profile = () => {

    return (
        <div className="detailsProfile p-20 bg-gray-100">
            <div className="w-100 mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-row -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">

                    <a className="w-40 h-40 flex items-center justify-start p-4 my-2 font-thin text-blue-500 uppercase transition-colors duration-200 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" href="#">
                        <div>
                            <div id="tooltip-jese" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Eva Longoria
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <img data-tooltip-target="tooltip-jese" class="w-30 h-30 rounded" src="https://cdn-images.livecareer.es/pages/foto_cv_lc_es_7.jpg" alt="Medium avatar" />
                        </div>
                    </a>

                    <li className="mr-2" role="presentation">
                        <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">NUEVO ANUNCIO</button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">MODIFICAR MI PERFIL</button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">MI CALENDARIO</button>
                    </li>
                    <li role="presentation">
                        <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">MIS RESEÑAS</button>
                    </li>
                </ul>
            </div>
            <div id="myTabContent">
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <Post_add />
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <Modify_profile />
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <Calendar />
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                    {/*  */}
                </div>
            </div>
            <br />
            <Valoraciones />
        </div>


    )

};

Profile.propTypes = {
    match: PropTypes.object
};
