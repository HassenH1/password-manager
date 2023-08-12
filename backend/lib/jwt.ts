import jwt from "jsonwebtoken";

class JWT {
  // private secret: string = process.env.TOKEN_SECRET
  generateAccessToken(key: { _id: any; email: string }): string[] | undefined {
    //read these articles to understand why i split the token

    //https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
    //https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
    //https://github.com/brian-childress/jwt-2-cookie-auth

    console.log(process.env.TOKEN_SECRET, "<----------token secret!");
    try {
      const token = jwt.sign(key, process.env.TOKEN_SECRET as string, {
        algorithm: "HS256",
        // expiresIn: "3000s", //30 minutes
      });
      console.log(token, "<---------------token is this?");
      if (token) {
        return token.split(".");
      }
    } catch (error: any) {
      throw error;
    }
  }

  verifyToken(token: string) {
    return jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err, decoded) => {
        if (err) {
          // I need to finish this
        }
      }
    );
  }
}

const jwtService = new JWT();
export default jwtService;
