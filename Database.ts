import { MongoClient } from "https://deno.land/x/mongo@v0.11.1/mod.ts";


const client = new MongoClient();
var myres:any;
myres=null;

client.connectWithUri('mongodb+srv://Ayush:hsyCp$2YLPLtDq9@cluster0.cihiv.mongodb.net/jssourcecode?retryWrites=true&w=majority')


interface UserSchema {
  _id:{$oid:string};
  firstname:any;
  lastname:any;
  mail:any;
  phoneno:any;
}

const db = client.database("jssourcecode");
const dc = db.collection<UserSchema>("jsusers");

const subscribers=await dc.count({});
console.log(subscribers);