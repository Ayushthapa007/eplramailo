import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import adminMiddleware from "./adminMiddleware.ts";
import {home,register,postRegister,admin,postAdmin,login,postlogin} from './Route.ts'
import {staticFileMiddleware} from './staticFileMiddleware.ts';



const app = new Application();
const router = new Router();

declare global {
  var aka: any;
  var go: any;
  interface Window {
    username: any;
    password: any;
  }
}


// Creating Routes
router.get('/',home);
router.get('/register',register)
router.post('/register',postRegister)
router.get('/admin',adminMiddleware,admin)
router.post('/admin',postAdmin);
router.get('/login',login);
router.post('/login',postlogin);



app.addEventListener('error',(evt: { error: any; })=> {
  console.log(evt.error);
})

//staticfilemiddleware
app.use(staticFileMiddleware);


// Adding middleware to require our router
app.use(router.routes());
app.use(router.allowedMethods());
// Making app to listen to port
console.log('App is listening to port: 8000');
await app.listen({port:8000});

