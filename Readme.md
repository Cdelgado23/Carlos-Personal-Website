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

These are the services we will build our architecture with:
- **DynamoDB** - This will be our database. If you are familiar with NoSQL databases this will not be a problem. 
- **Lambda** - A serverless computing solution. There are a number of languages availables. Still, if you are not familiar with any of them, do not worry. We will keep our code on the back really simple. 
- **S3** - We will use this service to store objects (files and pictures mainly)
- **API Gateway** - The endpoints of our Back. We will create a couple REST APIs to conect FrontEnd and BackEnd. 
- **CloudFront** - A content distribution network. We will reach every corner of the world with this services. 

Trasversaly I used **IAM** in order to make it secure enough. 

To be sure I am not charged, or the charges will be minimal (a couple of cents in the worst scenario), I use **AWS Budges**. You either have to make a big mistake while doing this small project, or become real famous to be charged for it, and both things are higly unlikly to happend.

![Architecture](https://github.com/Cdelgado23/OPENCV-CVHandler/blob/master/CV_Page_Diagram-Final%20Architecture.png)
