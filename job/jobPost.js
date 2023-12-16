
import { ObjectId } from "mongodb";
import collection from "../mongo.js";
import { checkString, checkStringArray, checkLocation, checkNumber } from "../src/helper/validation.js";

export const addJobPosting = async (
    companyName,
    title,
    description,
    city,
    state,
    salary,
    tags,
    userId
) => {
    checkString(title)
    checkString(city)
    checkNumber(salary)
    checkStringArray(tags)

    description = description.trim();
    if (description.length === 0) {
        throw new Error ("Description can not be empty or with just spaces.");
    }

    const newPost = {
        _id: new ObjectId(),
        employerId: userId,
        companyName: companyName,
        title: title,
        description: description,
        city: city,
        state: state,
        salary: salary,
        tags: []
    }


    const insertInfo = await collection.collectionPosts.create(newPost);

    return insertInfo
}




export async function getAllJobs() {

    const jobs = await collection.collectionPosts.find()

    return jobs

}

export async function getMyJobs(userId) {

    const jobs = await collection.collectionPosts.find({
        employerId: userId
    })

    return jobs

}
