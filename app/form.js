module.exports = {
    "title": "This is a test.",
    "autoClose": false,
    "message": "Thank You",
    "callback-url": "http://requestb.in/14s177k1",
    "fields": [{
        "type": "fbid",
        "name": "fbname",
        "label": "fbName"
    }, {
        "type": "input",
        "name": "name",
        "label": "Name",
        "validations": [{
            "regex": "^[A-Z a-z]+$",
            "msg": "Only alphabets are allowed in this field"
        }, {
            "regex": "^[A-Z a-z]{6,}$",
            "msg": "Minimum 6 characters required"
        }]
    }, {
        "type": "radio",
        "name": "gender",
        "label": "Gender",
        "options": [
            "Male",
            "Female"
        ],
        "validations": [{
            "regex": "",
            "msg": ""
        }]
    }, {
        "type": "select",
        "name": "account",
        "label": "AccountType",
        "options": [
            "current",
            "savings"
        ],
        "validations": [{
            "regex": "",
            "msg": ""
        }]
    }, {
        "type": "checkbox",
        "name": "interest",
        "label": "Interests",
        "options": [
            "Cooking",
            "Reading"
        ],
        "validations": [{
            "regex": "",
            "msg": ""
        }]
    }],
    "users": [
        "Testing"
    ]
};