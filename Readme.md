# OpenCV - CV Editor
I know, OpenCV already exist, it is not about CVs, bla bla bla. 

This is very diferente. This OpenCV will help you to create your own website, with its own chatbot, to function as your online CV. 

Again, I know, this might seem too broad and not too clear, but my goal is to create an architecture you can replicate, so you only have to think about the information you want to show, and how you want to show it. 

If you are new to AWS and Cloud architectures, this is the place to be. I was new when I started this project, so I understand how disturbing this can be. 

This is not about the front, so please, do not judge my FrontEnd skills, I know I need to work on it.

let's talk about the tools we will be using. 
# Tools
### FrontEnd
For the FrontEnd, I simply used what I already (kind of) knew. 
 - Bootstrap 4:
 - NES.css:
 - Javascript:
 - JQuery:

If you know already a little bit about Front, you will probably go for something else. Feel free to adapt it to your needs and preferences. 

### BackEnd

For the BackEnd, we will be working with Amazon Web Services. Yes, this is about AWS. We will be using only the free tier, so we won't be paying for this if we make it in the proper way. 

These are the services we will build our architecture with:
- **DynamoDB** - This will be our database. If you are familiar with NoSQL databases this will not be a problem. 
- **Lambda** - A serverless computing solution. There are a number of languages availables. Still, if you are not familiar with any of them, do not worry. We will keep our code on the back really simple. 
- **S3** - We will use this service to store objects (files and pictures mainly)
- **API Gateway** - The endpoints of our Back. We will create a couple REST APIs to conect FrontEnd and BackEnd. 
- **CloudFront** - A content distribution network. We will reach every corner of the world with this services. 

Also we will need to know a little bit about **IAM** in order to make it secure enough. 

To be sure we will not be charged, or the charges will be minimal (a couple of cents in the worst scenario), we will use **AWS Budges**. You either have to make a big mistake while doing this small project, or become real famous to be charged for it, so don't worry, both things are higly unlikly to happend.