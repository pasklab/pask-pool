export default (function () {
  'use strict';

  let app_locale = 'fr';

  let messages = {
    en: {
      tooShort: '%{count} characters or more required',
      tooShortWords: '%{count} words or more required',
      not_blank: 'This field is required',
      email: 'Must be a valid email format',
      hpot: 'Error'
    },
    fr: {
      tooShort: '%{count} caractères ou plus requis',
      tooShortWords: '%{count} mots ou plus requis',
      not_blank: 'Ce champ est requis',
      email: 'Doit-être un courriel valide',
      hpot: 'Erreur'
    }
  };

  return {
    setLocale: (locale) => {app_locale = locale},
    messages: messages,
    constraints: () => {
      return {
        name: {
          presence: {
            allowEmpty: false,
            message: messages[app_locale]['not_blank']
          },
          length: {
            minimum: 3,
            tooShort: messages[app_locale]['tooShort']
          }
        },
        email: {
          presence: {
            allowEmpty: false,
            message: messages[app_locale]['not_blank']
          },
          email: {
            message: messages[app_locale]['email']
          }
        },
        subject: {
          presence: {
            allowEmpty: false,
            message: messages[app_locale]['not_blank']
          },
          length: {
            minimum: 2,
            tooShort: messages[app_locale]['tooShort']
          }
        },
        message: {
          presence: {
            allowEmpty: false,
            message: messages[app_locale]['not_blank']
          },
          length: {
            minimum: 5,
            tooShort: messages[app_locale]['tooShortWords'],
            tokenizer: function(value) {
              return value.split(/\s+/g);
            }
          }
        },
        hpot: {
          length: {
            is: 0,
            wrongLength: messages[app_locale]['hpot']
          }
        }
      }
    }
  };
}());