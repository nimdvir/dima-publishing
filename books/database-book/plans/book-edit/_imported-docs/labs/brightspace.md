# Getting Started with Brightspace API Automation

[https://community.d2l.com/brightspace/kb/articles/21863-how-to-get-started-with-oauth-2-0](https://community.d2l.com/brightspace/kb/articles/21863-how-to-get-started-with-oauth-2-0)

*By Mark Tse*

## What is OAuth 2.0?

OAuth 2.0 is an open standard authentication framework that provides multiple authentication flows, including the [three-legged OAuth flow](https://tools.ietf.org/html/rfc6749#section-4) that is now supported by Brightspace. It allows developers to write applications that access different services on behalf of a user.

## Target Audience

This post is targeted towards developers who are looking to write applications that utilize Brightspace APIs. We now support the OAuth 2.0 specification for three-legged authentication in addition to our existing ID-key authorization specification.

More information is available via our OAuth 2.0 Q&A blog post including information on what this means for ID-key authorization, and the differences between the two.

## Getting Started

The goal of three-legged OAuth for developers is to get an **access token** that allows a third-party application access to a user's resource (e.g. grades via our application APIs) on the user's behalf.

### Entities

There are [four entities](https://tools.ietf.org/html/rfc6749#section-1.1) involved in three-legged OAuth:

- APIs
	- E.g. our application or data APIs
	- Also known as the **resource server** in the official specifications
- Application
	- A third-party application that uses our APIs
	- Also known as the **client** in the official specifications
- Authorization server
	- Provisions access tokens among other responsibilities
	- Brightspace's authorization server is hosted on [**auth.brightspace.com**](http://auth.brightspace.com/)
- User
	- E.g. a student or instructor
	- Also known as the **resource owner** in the official specifications

### Registering an Application

1. As a system administrator, navigate to the **Manage Extensibility** admin tool.
2. Click the **OAuth 2.0** tab.
3. Click the **Register an app** button.  
	![User-added image](https://us.v-cdn.net/cdn-cgi/image/quality=80,format=auto,fit=scale-down,height=300,width=300/https://community.brightspace.com/servlet/rtaImage?eid=ka55W0000000FD7&feoid=00N6100000I8Xgk&refid=0EM5W0000008kCy)
	User-added image
4. Register the sample application. For this example, use the following values:
- The **Redirect URI**  is  [https://localhost:3001/callback](https://localhost:3001/callback)
- The **Scope**  is  **core:\*:\***

After registration, you will be presented with a **Client ID**  and a  **Client Secret**, which you will need for the next section.

More information about application registration is available in the OAuth 2.0 section of our [API Reference](https://docs.valence.desire2learn.com/basic/oauth2.html) Documentation.

## Code Example Walkthrough

We have created a [sample application](https://github.com/Brightspace/oauth2.0-client-example)  using  [Express](http://expressjs.com/)  to help developers leverage OAuth 2.0. This application will initiate the three-legged OAuth flow to obtain an access token for a given user, and then call the  [whoami API](http://docs.valence.desire2learn.com/res/user.html#get--d2l-api-lp-\(version\)-users-whoami) using that token.

The user will make several web requests to the application during the flow, and the application defines a route for each of those requests. The following walkthrough will go through each route in the order that the user will encounter them in.

1\. The user visits the landing page of the application, which contains a Get Data button:

```javascript
app.get('/', function(req, res) {

    // returns an HTML page with a "Get Data" button

    res.render('index');

});
```

2\. The Get Data button calls the /auth route that causes the application to perform an authorization request. The application does so by crafting the request URI (an endpoint on our authorization server), and redirecting the user to that URI:

```javascript
app.get('/auth', function(req, res) {

    var authCodeParams = querystring.stringify({

        response_type: "code",

        redirect_uri: getRedirectUri(req),

        client_id: process.env.CLIENT_ID,

        scope: "core:*:*",

        state: "NotASecureState_rfc6749_section_10.12"

    });

    res.redirect(authCodeEndpoint + "?" + authCodeParams);

});
```

3\. The user will be prompted to log in using their Brightspace credentials (if they are not logged in already). Upon a successful login, the user will be presented a page where they can confirm if they allow the application to act on its behalf. This step is part of the [authorization request](https://tools.ietf.org/html/rfc6749#section-4.1.1), but does not involve the application.  

4\. The authorization service provides an [authorization response](https://tools.ietf.org/html/rfc6749#section-4.1.2)  to the application by redirecting the user back to the application. This is based on the  **Redirect URI** value provided during application registration.  
  
Let's look at each component of this route definition separately:

a. This registers the callback route that the authorization server will redirect the user to:

```javascript
app.get('/callback', function(req, res) { ... }
```

b. Using the authorization code from the authorization response, as well as the application's credentials, the application makes an access token request:

```javascript
var authorizationCode = req.query.code;

var payload = { 

   grant_type: "authorization_code",

    redirect_uri: getRedirectUri(req),

    code: authorizationCode};

request

    .post(tokenEndpoint)

    .auth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

    .type('form') 

   .send(payload)

    .end( ... )
```

c. **Important**: although not shown, the application should also check the  *state* parameter to ensure it has the same value we sent to the authorization server. This ensures the */callback*  endpoint is not processing authorization codes that were not requested by the application. For this reason, the  *state* value sent to the authorization server in the authorization request should be a non-guessable value.

d. The access token response will contain an access token that allows the the application to call APIs on behalf of user. We store this value in a cookie for simplicity so that we can make an API call in the next step:

```javascript
function(err, postResponse) { 

   if (err) { 

       console.log( 

           'Access Token Error',

            err.response || err

        );

        res.redirect('/'); 

   } else { 

       res.cookie( 

           cookieName,

            { accessToken: postResponse.body.access_token },

            cookieOptions

        );

        res.redirect('/data');

    }});
```

e. Putting it all together:

```javascript
app.get('/callback', function(req, res) { 

   var authorizationCode = req.query.code;

    var payload = {

        grant_type: "authorization_code",

        redirect_uri: getRedirectUri(req),

        code: authorizationCode

    };

    request

        .post(tokenEndpoint)

        .auth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

        .type('form')

        .send(payload)

        .end(function(err, postResponse) {

            if (err) {

                console.log( 

                   'Access Token Error',

                    err.response || err

                );

                res.redirect('/');

            } else {

                res.cookie(

                    cookieName,

                    { accessToken: postResponse.body.access_token },

                    cookieOptions

                );

                res.redirect('/data');

            }

        });

});
```

5\. The application uses the access token to call APIs on the user's behalf:

```javascript
app.get('/data', function(req, res) {

    var access_token = req.cookies[cookieName].accessToken;

    request

        .get(process.env.HOST_URL + '/d2l/api/lp/1.10/users/whoami')

        .set('Authorization', \`Bearer ${access_token}\`)

        .end(function(error, response) {

            if (error) {

                var errorMessage = JSON.stringify(error, null, 2);

                console.log(errorMessage);

                res.send(\`<pre>${errorMessage}</pre>\`);

            } else {

                var locals = {

                    data: JSON.stringify(

                            JSON.parse(response.text || '{}'),

                            null,

                            2

                        )

                };

                res.render('data', locals);

            }

        });

});
```