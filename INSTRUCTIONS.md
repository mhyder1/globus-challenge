# Globus Frontend Challenge

## Overview:
The goal of this challenge is to allow candidates to demonstrate their abilities on skills that are used at Globus on a regular basis. We anticipate that some candidates may not be able to complete all the requirements in the time allowed, so we have prioritized them below. Please proceed to implement the requirements in the order given. Code clarity, organization and accuracy will be part of the evaluation.

A minimal express server has been provided to test your final code. The server can be started with `npm install && node app.js` from this directory. The four test values can be found at `/api/<test number>`. The api route and JSON test files should not be changed. However, if you would like to modify the express server to also serve your page, feel free. Note: this server requires an `api-key: 'globus'` header to return any data.

We use Ember.js on our projects, but feel free to use any libraries or frameworks you like. If building your project into ready-­to-­run JavaScript/CSS requires transpiling (e.g. Babel, Sass), please include a mechanism to do so (e.g. Grunt, Gulp, Broccoli, Make).

## Deliverable:
An e-mailed archive or a clonable git repository (e.g. on GitHub). You should include a README with clear directions for running and testing your code.

## Product Explanation:
This page is going to act as a status tracker, representing data in a user-friendly table. The data is minimal, so some interpretation is going to be required.

Status can be translated as such:
- INACTIVE: No start date
- ERROR: Has a start date and an end date, but total != processed
- SUCCESS: Has a start date and an end date, and total == processed
- IN PROGRESS: Has a start date and no end date, and total != processed

Design images can be found at `/design/<1 or 2>`.

## Requirements:
1. The final rendering of the data should look like the design PNGs included in this challenge. The columns in the table include:
    1. Status: This is an interpreted column determined by the four statuses as follows:
        1. INACTIVE: Display the words "not started"
        2. SUCCESS: Display the words "Completed: <end_date>" (where <end_date> is replaced by the data for end date.)
        3. ERROR: Display the words "Halted: <end_date>" (where <end_date> is replaced by the data for end date.)
        4. IN PROGRESS: Display the words "Time Remaining: <remaining>" (where <remaining> is replaced by the data for remaining time.)
    2. Progress: This is a combination of two fields. <processed>/<total>.
    3. User: This is a hyperlink that displays the user's full name where the link opens into a mail client.
    4. Request Date: This is just the request date.
    5. Nice Status: This appears below and across the rows above it. It is the status from the returned data object.
        1. Successful tasks should have their "nice_status" highlight the word "success"
        2. Failed tasks should have their "nice_status" highlight the word "fail" and "error"
2. Progress should be shown in byte notation rather than just raw bytes. Thus 1231245566 bytes translates to 1.15 GB.
3. Sort Order: Inactive tasks, Tasks in progress. Secondary sort: Completion Date.
4. Keep the same case when highlighting words in Successful and Failed tasks.
5. Remaining Time should show as hh:mm:ss for any remaining time less than 2 days. If remaining time is above 2 days, show it as "# days"
6. Some error handling should exist.
    1. test3.json cannot be parsed by JSON.parse(), this is an error.
    2. test4.json has a number of errors.
7. The markup should be responsive.

## Follow-up:
1. Pick one of your implementation decisions and list some of its pros and cons.
2. Briefly describe any testing you feel should be added if we were going to put this in production.

