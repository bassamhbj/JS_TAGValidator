# TAG Validator

TAG Validator is a JavaScript script that makes easy the form validation using a clear sintax.
It works using HTML5's **data attributes** for set the Validation Rules.
```html
<input type="text" id="name"
                    data-validator="require max-length" 
                    data-max-length="20">
```

## How to set up TAG Validator
First you need to include the script in the page.
`<script src="tagvalidator.js"/>`

For set the Validation Rules there are two ways:
- Writting the Rules directly in the HTML control
- With JS Object 

### Writting the Rules (directly way)
The format is as follows: **data-[TAG Name]="[rules]"**
`data-validator="require numeric"`

And just need to be added to the HTML control:
```html
<input type="text" id="name" 
                    data-validator="require numeric">
```

### Using JS Object
JavaScript Objects allows you configure all the HTML controls having all the information for validation in one places. Making future changes and debugging easy.
```javascript
var settings = [
	{
		tag_name: "rules"
	}
]
```
Example:
```javascript
var settings = [
	{
		id: "name",
		validator: "require"
	}, {
		id: "age",
		validator: "require numeric"
	}
]
```
Settings is an array of objects. For each control, one object. In each object, the **ID** property is mandatory, the others are optional.
How to initialize the settings:
```javascript
var base = new ValidatorSettings();
base.setSettings(settings);
```
This functions binds the settings in every HTML control.

## TAGS
Tags are attributes for each HTML control that contains the information for validate it.
Available TAGS:
- ID
- VALIDATOR
- GROUP

## RULES
The Rules indicates how the HTML has to be validated.
Available RULES:
- REQUIRE
- NUMERIC
- MAX_LENGTH
- SAME
- PASSWORD
- PHONE
- EMAIL