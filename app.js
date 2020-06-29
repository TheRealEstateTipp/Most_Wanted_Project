"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  console.log('searchType ${searchType}')
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let numTraits = promptFor("Do you want to search for one trait or many? Enter 'one' for 1 or 'many' for more than one trait", chars);
      switch(numTraits){
        case "one":
           let returnedTraits = searchByTrait(people);
           let count = returnedTraits.length;
           if (returnedTraits.length >1){
            let person =  searchByName(returnedTraits);
            console.log('Person ${person}');
             mainMenu(person,people)
           }
          break;
        case "many":
          searchResults = searchByTraits(people);
          break;
        default:
          app(people);
      } 
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    alert("First Name: " +  person[0].firstName + "\n" + "Last Name " +  person[0].lastName + "\n" + "Gender: " + person[0].gender + "\n" + "Date of Birth: " + person[0].dob  + "\n" + "Height: " + person[0].height + "\n" + "Weight: " + person[0].weight + "\n" + "Eye Color: " + person[0].eyeColor + "\n" + "Occupation: " + person[0].occupation );
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByTrait(people){
 
  let traitName = promptFor("What type of trait do you want to search for: \ngender \ndob \nheight \nweight \neyeColor \noccupation ", chars);
  let trait = promptFor('What trait do you want to search for?', chars);
  let result;

  switch(traitName){
    case "gender":
     traitName = "gender";
     result = filterByTrait(people,traitName, trait);
     displayPeople(result);
     return result;
     break;
    case "dob":
      traitName="dob";
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
      return result;
      break;
    case "height":
      traitName="height";
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
      return result;
      break;
    case "weight":
      traitName="weight";
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
      return result;
      break;
    case "eyeColor":
      traitName="eyeColor"
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
      return result;
      break;
    case "occupation":
      traitName="occupation"
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
      return result;
      break;
    default:
      app(people);
  }
  
}

function searchByTraits(people){
  
  let result;
  for(let i = 0; i < 5; i++){
      result = searchByTrait(people);
  
    
    if(result.length == 1){
        return result;
    }

    if (i >=1){
        displayPeople(result);
        let searchAgain = promptFor("Would you like narrow down your search by entering an additional trait?", yesNo).toLowerCase();
        if(searchAgain === "no"){
            searchByName(result);
            return result;
        }

    }
    people = result;
  }

}
        


function filterByTrait(people, traitName, trait){
  let foundPerson = people.filter(function(person){
    if (person[traitName] === trait){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// keep calling itself until no more parents are found
function findDescendants(people, person){


}

// only letters are accepted as input
function chars(input){
  var letters = /^[A-Za-z]+$/;
  if(input.match(letters))
  {
    return true;
  }
  else
  {
    alert("Invalid input.")
    return false;
  }
}

