function TagValidator(){
    var _fieldId = "";
    var self = this;

    this.Tags = {
        ID: "id",
        VALIDATOR: "validator",
        GROUP: "group",
        TYPE: "type", // no incluir de momento
        NEED: "need" // no incluir de momento
    }

    this.Rules = {
        REQUIRE: 'require',
        NUMERIC: 'numeric',
        MAX_LENGTH: 'max-length', // param
        SAME: 'same', // group
        PASSWORD: 'password',
        PHONE: 'phone',
        EMAIL: 'email'
    }

    this.validate = function (fieldId){
        _fieldId = fieldId;
        doValidate();
    }

    function doValidate(){
        var ruleStr = getFieldDataByIdTag(_fieldId, self.Tags.VALIDATOR);
        
        if(ruleStr.trim() != ""){
            let ruleList = ruleStr.toLowerCase().trim().split(' ');

            executeRules(ruleList);
        }
    }

    function executeRules(ruleList){
        var validator = new Validator(_fieldId);
        validator.clearError();

        ruleList.forEach(rule => {
            switch(rule){
                case self.Rules.REQUIRE:
                    validator.require(getFieldValueById(_fieldId));
                    break;
                case self.Rules.NUMERIC:
                    validator.numeric(getFieldValueById(_fieldId));
                    break;
                case self.Rules.MAX_LENGTH:
                    let length = getFieldDataByIdTag(_fieldId, rule);
                    validator.maxLength(getFieldValueById(_fieldId), length);
                    break;
                case self.Rules.SAME:
                    let controlList = findFieldSameGroup(rule);
                    let value2 = getFieldValueByControl(controlList[0]);
                    validator.same(getFieldValueById(_fieldId), value2);
                    break;
                case self.Rules.PASSWORD:
                    validator.password(getFieldValueById(_fieldId));
                    break;
                case self.Rules.PHONE:
                    validator.phone(getFieldValueById(_fieldId));
                    break;
                case self.Rules.EMAIL:
                    validator.email(getFieldValueById(_fieldId));
                    break;
            }
        });
    }

    function getFieldValueById(fileId){
        return $("#" + fileId).val();
    }

    function getFieldValueByControl(control){
        return control == null ? "" : $(control).val();
    }

    function getFieldDataByIdTag(fileId, tag){
        return $("#" + fileId).data(tag);
    }

    function getFieldDataByControlTag(control, tag){
        return control == null ? "" : $(control).data(tag);
    }

    function findFieldSameGroup(){
        var controlList = [];

        $("[data-" + self.Tags.GROUP +"]").filter(function() {
            if(this.id != _fieldId){
                let groupTarget = getFieldDataByControlTag(this, self.Tags.GROUP);
                let groupCurrentField = getFieldDataByIdTag(_fieldId, self.Tags.GROUP);

                if(groupTarget.trim() != "" && groupTarget.trim() == groupCurrentField.trim()){
                    controlList.push(this);
                }
            }
        });

        return controlList;
    }
}

function Validator(fieldId){

    const ERROR_ID_TEMPLATE = "_error";

    this.clearError = () => { deleteError() };

    this.require = function(value){
        if(value.trim() == ""){
            showError("This is a require field");
        }
    };

    this.numeric = function (value){
        if(value.trim() == ""){
            return;
        }

        var regex = new RegExp(/^[0-9]+$/);
        if(!regex.test(value)){
            showError("Input a numeric value");
        }
    };

    this.maxLength = function (value, length){
        if(value.trim() == ""){
            return;
        }

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
        if(value.trim() == ""){
            return;
        }

        var regex = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
        if(!regex.test(value)){
            showError("Input an alphanumeric between 6 and 20 characters");
        }
    };

    this.phone = function(value){
        if(value.trim() == ""){
            return;
        }
    };

    this.email = function(value){
        if(value.trim() == ""){
            return;
        }
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

function ValidatorSettings(){
    this.setSettings = function(settings){
        settings.forEach(item => {
            var controlId = ""

            Object.keys(item).forEach(key => {
                if(key == "id"){
                    controlId = item[key];
                }else if(controlId.trim() != ""){
                    $("#" + controlId).attr("data-" + key.replace('_', '-'), item[key]);
                }
            });

            controlId = "";
        });
    }
}