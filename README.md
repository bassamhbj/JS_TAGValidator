# TAG Validator


TAG Validator is an HTML form validator script. Using HTML5 [data] attributes allows you to set validation rules for each field in the form in an easy way.

#### TAG Example

```html
<input type="text" id="name" class="form-control" 
                    data-validator="require max-length" 
                    data-max-length="20">
```

### How to validate a field
For validate a field, just need to call the **validate** function from TAG Validator and pass the field **ID** as parameter.

```javascript
<script type="text/javascript">
	$(function(){
		$("input[data-validator]").blur(function(){
			var tagValidator = new TagValidator();
			tagValidator.validate(this.id);
		});
	});
</script>
```

This script wil validate every **input** field that contains the **data-validator** attribute after lose the focus.

### data-validator
This attribute indicates the validation rules for that field. It accepts any of the supported rules.

```
data-validator="require max-length int phone" 
```

### data-{parameter}
If any validation rule needs a parameter, like maximum length, it is indicated for the word data + the validation rule.

`data-{validation rule}="{parameter}" `

```
data-max-length="20" 
```

### Validation Group
Some rules will need to be agrouped to execute the rule. For example, the Same rule will need to compare two fields.
The way to indicate **validation group** is:

`data-{validation rule}-group="{group name}"`

```html
<input type="password" id="password"
                    data-validator="password" 
                    data-same-group="pass">

<input type="password" id="repassword" class="form-control" 
                    data-validator="same" 
                    data-same-group="pass">
```

**repassword** field has the rule **same** and the **pass group** is the target group to be validated.

### Supported Validation Rules
- Require: require
- Max length: max-length (need parameter)
- Int: int

| Rule Name  | Rule Keyword | Parameter |
| ------------- | ------------- | ------------- |
| Require  | require  | |
| Numeric  | int  | |
| Max Length | max-length | length(numeric) |
| Same | same | Same Group field |
| Password | password | |
