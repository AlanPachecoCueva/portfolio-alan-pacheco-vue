import {
  nav_bar_dic_es,
  nav_bar_dic_en,
} from "../plugins/dictionaries/nav-bar-dicts.js";

import {
  home_dic_es, 
  home_dic_en
} from "../plugins/dictionaries/home-dicts.js";

import {
  card_dic_es,
  card_dic_en
} from "../plugins/dictionaries/cards.js";

import {
  about_me_dic_es, about_me_dic_en
} from "../plugins/dictionaries/about-me-dicts.js";

import {
  skills_dic_es, skills_dic_en
} from "../plugins/dictionaries/skills-dicts.js";

import {
  projects_dic_es, projects_dic_en 
} from "../plugins/dictionaries/projects-dicts.js";

import {
  Contact_dic_es, Contact_dic_en 
} from "../plugins/dictionaries/contact-dicts.js";

export default {
  ES: {
    ...nav_bar_dic_es,
    ...home_dic_es, 
    ...card_dic_es,
    ...about_me_dic_es,
    ...skills_dic_es,
    ...projects_dic_es,
    ...Contact_dic_es, 
  },

  EN: {
    ...nav_bar_dic_en,
    ...home_dic_en,
    ...card_dic_en,
    ...about_me_dic_en,
    ...skills_dic_en,
    ...projects_dic_en,
    ...Contact_dic_en,
  },
};
