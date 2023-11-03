import { Request, Response } from "express";
import { STATUS_CODE } from "../utils";
import { automateFormService } from "../service/formService";

export const automateFormController = async ( req: Request, res: Response ) => {
    try {
        const { body }  = req;        
        if (!body.url || !body.data || !body.data.length) {
            throw new Error('Mandatory parameters not found');
        }

        const { url, data } = body;
        await Promise.allSettled( data.map( async ( item ) => {
            const result = await automateFormService(url, item);
            console.log(result);
        }));
        res.status(STATUS_CODE.SUCCESS).send({ message: "Form filled successfully" })
    } catch (error) {
        console.error('Error while automating form ', error);
        res.status(STATUS_CODE.BAD_GATEWAY).send(error);
    }
}
