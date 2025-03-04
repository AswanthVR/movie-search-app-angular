import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Intercepting request:", req.url);
  
  const protectedApi = "query="
  
  if(req.url.includes(protectedApi)){

      const token = "1a234s567dfg89k0";
      const modifiedReq = req.clone({
        setHeaders: {
        Authorization: token? `Bearer ${token}`:"", 
        "Accept" : "application/json"
        }
      });
      return next(modifiedReq);
  }
  return  next(req);

};
