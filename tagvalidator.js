function TagValidator(){
    const VALIDATOR_ATTR = "validator";
    const VALIDATOR_GROUP = "group";

    var _fieldId = "";

    var ValidatorKey = {
        REQUIRE: 'require',
        INT: 'int',
        MAX_LENGTH: 'max-length', // param
        SAME: 'same', // group
        PASSWORD: 'password',
        PHONE: 'phone',
        EMAIL: 'email'
    };

    this.validate = function (fieldId){
        _fieldId = fieldId;
        doValidate();
    }

    function doValidate(){
        var validatorKeyStr = $("#" + _fieldId).data(VALIDATOR_ATTR);
        
        if(validatorKeyStr.trim() != ""){
            let validatorKey = validatorKeyStr.toLowerCase().trim().split(' ');

            executeKeyArray(validatorKey);
        }
    }

    function executeKeyArray(validatorKey){
        var validator = new Validator(_fieldId);
        validator.clearError();

        validatorKey.forEach(key => {
            switch(key){
                case ValidatorKey.REQUIRE:
                    validator.require(getFieldValueById());
                    break;
                case ValidatorKey.INT:
                    validator.int(getFieldValueById());
                    break;
                case ValidatorKey.MAX_LENGTH:
                    let length = getFieldValidatorParam(validatorKey);
                    validator.maxLength(getFieldValueById(), length);
                    break;
                case ValidatorKey.SAME:
                    let value2 = getFieldValueByControl(findFieldSameGroup(validatorKey));
                    validator.same(getFieldValueById(), value2);
                    break;
                case ValidatorKey.PASSWORD:
                    validator.password(getFieldValueById());
                    break;
                case ValidatorKey.PHONE:
                    validator.phone(getFieldValueById());
                    break;
                case ValidatorKey.EMAIL:
                    validator.email(getFieldValueById());
                    break;
            }
        });
    }

    /*function executeKey(validatorKey){
        var validator = new Validator(_fieldId);
        validator.clearError();

        switch(validatorKey){
            case ValidatorKey.REQUIRE:
                validator.require(getFieldValueById());
                break;
            case ValidatorKey.INT:
                validator.int(getFieldValueById());
                break;
            case ValidatorKey.MAX_LENGTH:
                let length = getFieldValidatorParam(validatorKey);
                validator.maxLength(getFieldValueById(), length);
                break;
            case ValidatorKey.SAME:
                let value2 = getFieldValueByControl(findFieldSameGroup(validatorKey));
                validator.same(getFieldValueById(), value2);
                break;
            case ValidatorKey.PASSWORD:
                validator.password(getFieldValueById());
                break;
            case ValidatorKey.PHONE:
                validator.phone(getFieldValueById());
                break;
            case ValidatorKey.EMAIL:
                validator.email(getFieldValueById());
                break;
        }
    }*/

    function getFieldValueById(){
        return $("#" + _fieldId).val();
    }

    function getFieldValueByControl(control){
        return control == null ? "" : $(control).val();
    }

    // Change function name
    function getFieldValidatorParam(key){
        return $("#" + _fieldId).data(key);
    }

    /*function getFieldValueByValidatorKey(key){
        var control = findFieldByValidatorKey(key);
        return getFieldValueByControl(control);
    }*/

    function findFieldSameGroup(key){
        var control = $("[data-" + VALIDATOR_ATTR + "], [data-" + VALIDATOR_GROUP +"]").filter(function() {
            if(this.id != _fieldId){
                if($(this).data(key + "-" + VALIDATOR_GROUP) == $("#" + _fieldId).data(key + "-" + VALIDATOR_GROUP)){
                    return this;
                }
            }
        });

        return control;
    }
}

function Validator(fieldId){

    const ERROR_ID_TEMPLATE = "_error";

    this.clearError = () =>{ deleteError() };

    this.require = function(value){
        if(value.trim() == ""){
            showError("This is a require field");
        }
    };

    this.int = function (value){
        var regex = new RegExp(/[0-9]/);
        if(!regex.test(value)){
            showError("Input a numeric value");
        }
    };

    this.maxLength = function (value, length){
        if(value.trim().length > length){
            showError("Input a value within " + length + " characters");
        }
    };

    this.same = function(value1, value2){
        if(value1.trim() != value2.trim()){
            showError("The values are not the same");
        }
    };

    this.password = function(value){
        var regex = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
        if(!regex.test(value)){
            showError("Input an alphanumeric between 6 and 20 characters");
        }
    };

    this.phone = function(value){
    };

    this.email = function(value){
    };

    function deleteError(){
        $("#" + fieldId + ERROR_ID_TEMPLATE).remove();
    }

    function showError(errorMsg){
        var span = document.createElement("span");
        span.id = fieldId + ERROR_ID_TEMPLATE;
        span.className = "text-danger";
        span.innerText = errorMsg;

        $("#" + fieldId).after(span);
    }
}