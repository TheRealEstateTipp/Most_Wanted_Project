"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
 
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
           searchResults = searchByTrait(people);
           
           if (searchResults.length >1){
              searchResults =  searchByName(searchResults);
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
    displayPerson(person);
    break;
    case "family":
     getFamily(person,people);
     
      
    break;
    case "descendants":
      let arrayOfFoundDescendants = [];
      displayPeople(findDescendants(people,person[0],arrayOfFoundDescendants));
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
 
  let traitName = promptFor("What type of trait do you want to search for: \ngender \ndob \nheight \nweight \neyeColor \noccupation", chars);
  let trait;
  let result;

  switch(traitName){
    case "gender":
     traitName = "gender";
     trait = promptFor('Male or female?', chars);
     result = filterByTrait(people,traitName, trait);
     displayPeople(result);
     
     break;
    case "dob":
      traitName="dob";
      trait = promptFor('Please enter a date of birth. (mm/dd/yyyy)', date);
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
     
      break;
    case "height":
      traitName="height";
      trait = promptFor('Please enter a height in inches.', nums);
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
     
      break;
    case "weight":
      traitName="weight";
      trait = promptFor('Please enter a weight in pounds.', nums);
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
     
      break;
    case "eyeColor":
      traitName="eyeColor"
      trait = promptFor('Please enter an eye color.', chars);
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
     
      break;
    case "occupation":
      traitName="occupation"
      trait = promptFor('Please enter an occupation.', chars);
      result = filterByTrait(people,traitName, trait);
      displayPeople(result);
     
      break;
    default:
      app(people);

      return result;
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
        let searchAgain = promptFor("Would you like to narrow down your search by entering an additional trait?", yesNo).toLowerCase();
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
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Gender: " + person[0].gender + "\n" + "Date of Birth: " + person[0].dob  + "\n" + "Height: " + person[0].height + "\n" + "Weight: " + person[0].weight + "\n" + "Eye Color: " + person[0].eyeColor + "\n" + "Occupation: " + person[0].occupation;
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


//return findDescendants(people, currentPerson, arrayOfFoundDescendants);
// if within the array of people, the parameter of person A's id matches another person B's parent id
// recursively call the function to see if person B is someone else's parent until no more is found.
function findDescendants(people, person, arrayOfFoundDescendants)
{
  people.forEach(function(currentPerson)
  {
    currentPerson.parents.forEach(function(currentPersonParents)
    {
      if(currentPersonParents === person.id)
      {
        arrayOfFoundDescendants.push(currentPerson);
        findDescendants(people, currentPerson, arrayOfFoundDescendants);
      }

    });
      
  });
      return arrayOfFoundDescendants;
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

// only numbers are accepted as input
function nums(input){
  var numbers = /^[0-9]+$/;
  if(input.match(numbers))
  {
    return true;
  }
  else
  {
    alert("Invalid input.")
    return false;
  }
}

//only dates are accepted as input
function date(input){
  var date = /\d{1,2}\/\d{1,2}\/\d{4}/;
  if(input.match(date))
  {
    return true;
  }
  else
  {
    alert("Invalid input.")
    return false;
  }
}

function getFamily(person, people){
let sibling;
let spouse;
let parents;

if (typeof(person[0].parents) !="undefined"){
  sibling = people.filter(function (individual){
   
    if (typeof(person[0].parents) != "undefined"){
      //got to finda a way to not find person object
    if (person[0].parents[0] === individual.parents[0]
       && person[0].id != individual.id){
      return true;
    }
    else{
      return false;
    }
  }
  });
  
}

if (person[0].currentSpouse != null){
   spouse = people.filter(function(individual){
    if (person[0].currentSpouse === individual.id){
      return true;
    }
    else{
      return false;
    }
  });
}

if (typeof(person[0].parents) != "undefined"){
  parents = people.filter(function(individual){
    if (person[0].parents[0] === individual.currentSpouse || person[0].parents[0] === individual.id){
      return true;
    }
      else{
        return false;
      }
   
  });
}

let arrayOfPeople = [];
for(let i =0; i < sibling.length; i++){
  arrayOfPeople.push(sibling[i]);
}
for (let i =0; i < parents.length; i++ ){
 arrayOfPeople.push(parents[i])
}
displayPeople(arrayOfPeople);
}

