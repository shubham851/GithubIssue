# GithubIssue
It contains the project which can show you the issues in any public repository.


Problem Description

Create a repository on GitHub and write a program in any programming language that will do the following:

Input : User can input a link to any public GitHub repository

Output :

Your UI should display a table with the following information -

    Total number of open issues

    Number of open issues that were opened in the last 24 hours

    Number of open issues that were opened more than 24 hours ago but less than 7 days ago

    Number of open issues that were opened more than 7 days ago

Solution Explanation:

1) The project has been implemented using angularJs programming language. 
2) it will give you all the open issues in public repository. just type public repository link(in valid format) in search bar. Ex. https://github.com/Shippable/support
3) There are filters attached in the top left corner of the page.
4) In the top right corner : it will give you number of open issues. 
5) get the issue description by clicking on the issue number.
6) The technologies used are: html,css,angularjs

* The file where the angularjs code is written is githubIssue.js. 

Instructions of running the application:

Go to the link : https://rawgit.com/shubham851/GithubIssue/master/index.html


Note : Scope of improvement -->
1. I could have used the cache which save all the issues for the particular repository. In this way , we don't have to go to the same url again.
cache will be refreshed in the interval of 24 hours.
2. give an user platform to solve the issue or edit the issue , if they have right to access that particular repository.



