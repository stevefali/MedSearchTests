# Med Search Tests
## This is a project for testing my ideas on a drug interactions search feature that I can add to [DrugBug](https://github.com/stevefali/DrugBug).

To test this out, run ``` npm i ``` to install the node_modules and then use a browser or postman to make a get request such as: ``` localhost:8080/warning?medicine=tacrolimus&interactor=Grapefruit ```

To make a request demonstrating interactions for a list of medications, make a request to the "mult" endpoint such as: ``` http://localhost:8080/warning/mult?interactor=grapefruit ```
