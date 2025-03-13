const otp_email_template = `
<html>
 <head>
  <title>
   OTP Email Template
  </title>
  
  <style>
   body {
            font-family: 'Roboto', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
        }
        .header img {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            color: #333333;
            margin: 0;
        }
        .content {
            color: #666666;
            line-height: 1.6;
        }
        .otp-code {
            text-align: center;
            margin: 30px 0;
        }
        .otp-code span {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            background-color: #e5e7eb;
            padding: 10px 20px;
            border-radius: 4px;
        }
        .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            text-align: center;
            color: #999999;
            font-size: 14px;
        }
        .footer .social-icons a {
            color: #999999;
            margin: 0 10px;
            text-decoration: none;
        }
  </style>
 </head>
 <body>
  <div class="container">
   <div class="header">
     <img alt="Company Logo" height="50"  src="https://storage.googleapis.com/a1aa/image/EwAxiWD0WqIkXGy7Hy-qMgIH7R7rmfYhTDt4I77mdec.jpg" width="50"/> 
    <h1>
     Your OTP Code
    </h1>
   </div>
   <div class="content">
    <p>
     Hello,[name]
    </p>
    <p>
     We received a request to access your account. Use the following OTP code to complete the process:
    </p>
    <div class="otp-code">
     <span>
      [otp]
     </span>
    </div>
    <p>
     If you did not request this, please ignore this email or contact support if you have questions.
    </p>
    <p>
     Thank you,
    </p>
    <p>
     The Company Team
    </p>
   </div>
   <div class="footer">
    <p>
     © 2023 Company. All rights reserved.
    </p>
    
   </div>
  </div>
 </body>
</html>

`
module.exports = otp_email_template