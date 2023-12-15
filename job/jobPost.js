
import { ObjectId } from "mongodb";
import collection from "../mongo.js";
import { checkString, checkStringArray, checkLocation, checkNumber } from "../src/helper/validation.js";

export const addJobPosting = async (
    companyName,
    title,
    description,
    requirements,
    city,
    state,
    salary,
    tags
) => {
    checkString(title)
    checkString(requirements)
    checkStringArray(requirements.split(','))
    checkString(city)
    //check salary
    checkNumber(salary)
    checkString(tags)
    checkStringArray(requirements.split(','))
    description = description.trim();
    if (description.length === 0) {
        throw 'Error: Description can not be empty or with just spaces.'
    }

    const newPost = {
        _id: new ObjectId(),
        employerId: new ObjectId(),
        companyName: companyName,
        title: title,
        description: description,
        requirements: [],
        city: city,
        state: state,
        salary: salary,
        tags: tags
    }


    const insertInfo = await collection.collectionPosts.create(newPost);

    return insertInfo
}




export async function getAllJobs() {

    const jobs = await collection.collectionPosts.find()

    return jobs

}
