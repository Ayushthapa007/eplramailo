import {RouterContext} from "https://deno.land/x/oak/mod.ts";
import {renderFileToString} from 'https://deno.land/x/dejs/mod.ts';
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






export const register=async (ctx:RouterContext) => {
  
    ctx.response.body= await renderFileToString(`${Deno.cwd()}/view/register.ejs`, {
     error:false,
    })
   
   };


export const postRegister=async (ctx:RouterContext) => {
  
    const bod = await ctx.request.body({type:'form'});
    const data=await bod.value;
    const fname=data.get('fname');
    const lname=data.get('lname');
    const email=data.get('email');
    const phone=data.get('phone');
    console.log(fname,lname,email,phone);
  if(await dc.findOne({mail:email})) {
   
  console.log('user already presence')
  
  ctx.response.body= await renderFileToString(`${Deno.cwd()}/view/register.ejs`, {
    error:'user already presence',
  });
  
  }else {
  const insertId=await dc.insertOne({
    firstname:fname,
    lastname:lname,
    mail:email,
    phoneno:phone,
  });
  
  console.log('user inserted')
  ctx.response.redirect("/");
  
  }
};   


export const admin=async (ctx:RouterContext) => {
  
    ctx.response.body= await renderFileToString(`${Deno.cwd()}/view/admin.ejs`, {
      subs:subscribers,
      res:myres,
    })
    };

export const postAdmin=async (ctx:RouterContext) => {
    const body = await ctx.request.body({type:'form'});
    const sdata=await body.value;
    const search=sdata.get('sear');
    console.log(search);

    myres=await dc.findOne({ "phoneno":search})
     console.log(myres.mail);

    ctx.response.redirect("/admin");
    
    }
 
export const home=async (ctx:RouterContext) => {
  
    ctx.response.body= await renderFileToString(`${Deno.cwd()}/view/index.ejs`, {})
  } 
  
  export const login=async (ctx:RouterContext) => {
  
    ctx.response.body= await renderFileToString(`${Deno.cwd()}/view/login.ejs`, {
      error:false,
    })
  }   

  export const postlogin=async (ctx:RouterContext) => {
    const logbody = await ctx.request.body({type:'form'});
    const logdata=await logbody.value;
    window.aka=logdata.get('username');
    window.go=logdata.get('password');
    console.log(aka,go);

    

    ctx.response.redirect("/admin");
    
  }