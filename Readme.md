# Personal Website

The initial idea was to create sort of a tutorial to recreat the development. Now it is just a project which helped me to get into AWS.

This is not about the front, so please, do not judge my FrontEnd skills, I know I need to work on it.

# Tools
These are the tools which helped me develop this project.
### FrontEnd
For the FrontEnd, I simply used what I already (kind of) knew. HTML, Css, and a little bit of Javascript. 
 - Bootstrap 4:
 - NES.css:
 - Javascript:
 - JQuery:

If you know already a little bit about Front, you will probably go for something else. Feel free to adapt it to your needs and preferences. Nowadays I would use a framework like React or Angular. 

### BackEnd

The BackEnd is working on Amazon Web Services. Yes, this is about AWS. It is making use only of the free tier.  

These are the services the architecture is based on:
- **DynamoDB** - This is the database. No SQL database.
- **Lambda** - A serverless computing solution. There are a number of languages availables. The simpler and faster the code is, the cheaper (if the free tier is not enough). In my case, this is 100% python. 
- **S3** - Service to store objects (files and pictures mainly)
- **API Gateway** - The endpoints of the Back. A couple REST APIs to conect FrontEnd and BackEnd. 
- **CloudFront** - A content distribution network. It makes the page accesible from every corner of the world. 

Trasversaly I used **IAM** in order to make it secure enough. 

To be sure I am not charged, or the charges will be minimal (a couple of cents in the worst scenario), I use **AWS Budges**. You either have to make a big mistake while doing this small project, or become real famous to be charged for it, and both things are higly unlikly to happend.

![Architecture](https://github.com/Cdelgado23/OPENCV-CVHandler/blob/master/CV_Page_Diagram-Final%20Architecture.png)
