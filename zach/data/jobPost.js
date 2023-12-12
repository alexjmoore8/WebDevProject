import { checkString, checkStringArray, checkLocation, checkNumber } from "../validation";
import { ObjectId } from "mongodb";
import collectionPosts from "./mongo";

export const addJobPosting = async ( 
    companyName,
    title,
    description,
    requirements,
    location,
    salary
) => {
    title.checkString(title, 'Title')
    requirements.checkStringArray(requirements, 'Requirements')
    location.checkLocation(location, 'Location')
    salary.checkNumber(salary, 'salary')
    description = description.trim();
    if (description.length === 0){ 
        throw 'Error: Description can not be empty or with just spaces.'
    }
    
    const postCn = await collectionPosts();

    const newPost = {
        _id: new ObjectId(),
        employerId: new ObjectId(),
        companyName: companyName,
        title: title,
        description: description,
        requirements: [],
        location: location,
        salary: salary
    }


    const insertInfo = await postCn.insertOne(newPost);
    
    console.log(insertInfo)
}
    
