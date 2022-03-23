import {RouterContext} from "https://deno.land/x/oak/mod.ts";
import {renderFileToString} from 'https://deno.land/x/dejs/mod.ts';


import { MongoClient } from "https://deno.land/x/mongo@v0.11.1/mod.ts";


const client = new MongoClient();
var admin:any;
client.connectWithUri('mongodb+srv://Ayush:hsyCp$2YLPLtDq9@cluster0.cihiv.mongodb.net/jssourcecode?retryWrites=true&w=majority')

const db = client.database("jssourcecode");
const dc = db.collection("jsadmin");

admin=await dc.findOne({'user':'Ayush'})





const adminMiddleware= async (ctx: RouterContext, next:Function)=> {
    if(window.go==admin.pass&& window.aka==admin.user) {
        await next();
    }else {
        
        ctx.response.body= await renderFileToString(`${Deno.cwd()}/view/login.ejs`, {
            error:'Unauthorized',
          });
    }
};
export default adminMiddleware;