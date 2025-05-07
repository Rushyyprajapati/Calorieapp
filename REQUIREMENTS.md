# Final Project Requirements

* Project is **Due Mon Apr 21, 11:59pm **

## Submission Instructions
* Your project is submitted as PR to merge your branch 'final-project' into main
  - This is similar to your other project submissions
  - You should demonstrate you understand the process of creating a branch, pushing it, and creating a PR
    - Steps will not be explicitly listed here
  - You will likely use the same process to submit work in your future jobs
* Be sure to include the reviewer(s) on your PR

Hint: Scoring is heavily influenced by attention to detail to all the practices taught in class.  Be sure to follow what you were taught, not just the items explicitly listed here.  (Example: Make sure to have a good commit message.  Not "Adds MYNAME" or "Adds files via upload")

## Goal

- You will write a Vite-based React SPA and a set of services to build a web application providing a purpose of your choice, such as a game, a review site, a site that provides some calculation service.
- If you choose to reuse a concept from a previous assignment or project, you will be graded only on NEW material, including new services. You need to demonstrate _your_ skills and understanding, so material that has already been written and refined does not count.  This means you can use any past work, but only the new parts will count to fulfill the project requirements, so you will need to add new features and expand on what the project does to meet all the requirements and show you can apply the skills from class to new material.

I recommend you start with a small idea you can quickly implement and then add features to that core functionality so you don't risk an incomplete or broken project.  (Commit to your local repo after each new feature so you can always go back to a working version.)

Example Projects include:
- A classwork tracking system, where each user can enter their assignments with due dates and see the list of upcoming assignments and mark when they are done.  Users are able to edit the due dates and completion status of existing assignments.

- A "flashcard" study system where the user can manage collections of data and run through flashcards to test their knowledge. The user can mark whether they got each card right and the system will show their total score each time and their personal best score.

- A "borrow" system where users can track items you they have lent to different people, tracking what they lent, when they lent it, when they expect it back, and if they have gotten it back. If someone who has borrowed something is also user on the system, they can be sent (within this application) reminder messages of when an item is due.

- A "secret santa" system where a user can create a group and other users can sign up for their groups, and the group owner can "finalize" the group and each user will be told who they are secretly assigned at random from the group (but not themselves!).  Each user can only see who they will be getting a gift for, not who anyone else is assigned.

- A basic social media clone - Users can post short messages, users can see posts by other users that they follow, users can reply to posts, users can follow other users, and users can "repost" messages by other users, so that their followers will see the message.  (Note: This is very heavy on the data structures!)

- A "store" website, where products can be viewed, added to a cart, and can "checkout" (similar to js-cart, but with a server side).  An admin user can login and update what products are available for "purchase".

## Expectations

### Structural Expectations
* Projects are individual (no groups)
* Project must be based in this directory
    * THIS directory (the one containing the REQUIREMENTS.md file) must be able to run the startup commands
      - Hint: use `npm create vite . -- --template react` to create files in this directory
        - This tells vite to use the current folder (`.`) instead of creating a new project folder
        - The command will warn there are already files, just "ignore" them
* The project must run with this series of commands: `npm install`, `npm run build`, `npm start`
    - Note the extra requirements about `npm start` below!
      - It should NOT start the vite dev server
      - It should start your single `server.js` that will run both your static SPA and your REST services
    - You may define additional commands as options, but running the above commands only must work
* Any `package.json` files you create/modify should be well organized and complete
    * Fill in fields accurately
    * Use `dependencies` and `devDependencies` appropriately
    * Configure `scripts` appropriately
* Your project must use `npm`, not `yarn` or other alternatives
* Your project must NOT include files not appropriate
  - Do not commit `node_modules/` or `dist/`, for example
  - Vite will automatically provide a `.gitignore` file to do this, you just need to not mess it up
* The project CANNOT use `npm start` to run `vite` or `npm run dev` 
    * You must use Vite to create and develop your application
    * You will have to adjust the `scripts` section of `package.json` 
    * Serve the results of `npm run build` as static files in your server (which starts with `npm start`)
    * This is how the production use of your project would work

### Front End Expectations
* The project must use a React-based front end
* The project must be a Vite-based SPA and an express-based NodeJS server
* Your front end code must follow all the best practices as outlined in classes and in PR feedback
* Your front end code may use ONLY outside libs or resources listed here, unless you get advance approval
    * react, react-dom, vite, and the libraries that vite installs
    * icons as SVG or PNG (only) from https://fonts.google.com/icons 
    * images from https://unsplash.com or images you personally own
    * vitest, jest, enzyme, @testing-library/react, chai, sinon, tape
* Advance approval will NOT be granted for:
    * SASS/less
    * CSS preprocessors
    * react-router, @tanstack/router 
    * react-query, @tanstack/query
    * font-awesome or other icon libraries
    * Bootstrap/Foundation/similar libraries
    * axios and other fetch() alternatives
    * jQuery or other non-react DOM manipulation
* Repeat: Notice the modules listed above are NOT allowed for your final project

### Service Expectations
* Your backend/service code must use express-based NodeJS
* The project must involve calling REST-based service calls that you write
    * You may call outside services as well, but you must use some services you write
    * Your service calls (the ones you wrote) must include at least 3 different HTTP methods in a RESTful way
      * Services functionally identical to previous services we've written (such as login/logout) will not count towards this limit
- You must use fetch() and promises directly (NO async/await)
  - Not because async/await is bad, but you must show you understand promises themselves
* Your backend code must follow the best practices as outlined in classes and in PR feedback 
* Your backend code may include ONLY outside libs listed here, unless you get __advance__ approval
    * express
    * cookie-parser
    * eslint, prettier, babel
    * vitest, jest, mocha, chai, sinon, tape
* Advance approval will NOT be granted for:
    * express-session
    * SASS/less
    * CSS preprocessors
    * Bootstrap/Foundation/Tailwind similar libraries
    * Database libraries that require credentials
    * axios and other fetch() alternatives
    * jQuery or other non-react DOM manipulation
* Repeat: Modules listed above are NOT permitted as part of your final project
* Modules not listed as pre-approved are considered not allowed unless you have approval BEFORE the project due date

### Functionality and Creativity Expectations
* Your project must do something useful and/or interesting
* Your project must be usable and attractive
* Your project must have some form of input validation (front end AND back end)
* Your project must have some form of helpful error reporting (to the user, on screen)
* Your project may be considered for the college to exhibit - projects that meet that criteria are scoring very well for functionality and creativity
* Because I am banning routing libraries like react-router, the app is NOT expected to handle the Back button or maintaining the current front-end state on page reload/refresh

### README Expectations
* You must include a README.md in your project
  - Replace the default README.md file Vite creates
* Your README must include a good and useful description of what your project does
* Your README must include a basic description of how to use your project (so we can use your application and see all the parts)
    * Your project shouldn't **require** someone read the README to understand how to use it (discoverable functionality)
* You must indicate the source and licensing of any outside images/media in your README.  Any outside libraries or resources that you gained approval for should also be listed with their source and licensing information.

### Security Expectations
- Require registration(creation) of usernames before allowing those usernames to login (still no passwords!)
    - Do not treat any username as pre-registered the way we have been.  Instead match what you see on most websites: Register once, and then you can login as that user.  Just leave out any passwords.
    - You must treat "dog" as existing username that always fails an authorization check (has no permissions)
- Users must have an authentication step
    - No actual passwords are checked, but the step must happen
      - Banning user "dog" counts IF you treat it differently from invalid characters in the username
        - Instead treat the user as not having enough permissions
    - There must be some case where authentication is denied (such as banning user "dog")
    - The step should be clearly distinct as when any authentication happen
    - The server must respond with some sort of token/session id for the client to use for authentication/authorization
      - A session id cookie counts
- All service calls must have some form of authorization (unless the service call is allowed for users that haven't yet logged in)
    - passing a token that is validated on the server side
    - token may be passed as a cookie or as a header
- All security best practices from classes must be followed
    - In particular, various insertion attacks (XSS, etc)
      - React will do MOST of this automatically on the front end, but the backend MUST sanitize user input
      - For this project, you may store data that is "unsafe" for HTML (that is, data that might contain `<`, `>`, or `&` characters.  React will automatically convert these to NOT be treated as HTML).
    - Exception: We aren't worried about requiring HTTPS
- Do NOT store or ask for any passwords in any way
    - You can completely omit passwords, or you can ask for a password and not check it
    - You CAN require that a password be given (not ''), but SHOULD NOT check passwords for any other specific value or pattern
    - This is because we have learned that writing our own password storage/use is poor security unless we specialize in securing passwords

### Restrictions
- All services must return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
* Do not use any other outside JS or CSS files
  - Exception: You may use Google fonts
* Use arrays and objects when they each make sense
- Do not use `async` or `await` until you are out of this course
* Use Semantic HTML and semantic CSS class names
* Do not use floats to do more than manage flowing text with images
* Do not use HTML tables or CSS table layouts for anything other than tables of data
* Do not use `alert`, `prompt`, `confirm` or other blocking JS
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily
* Follow the best practices as described in this course to date

## Grading

Note: The project is to show your understanding of the material from class.  If you don't show your understanding of class material, you can lose points, even if your assignment "works".  

**Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).**

This assignment is graded as a base of 100 points
- Each Critical Requirement you miss is a minimum of -10 points, and may lose more
- Each Additional Requirement you miss is -2 points.  There may be MANY non-critical requirements, and they add up!
- Each Bonus Requirement is +2 points, and the Project grade may exceed 100%
  - Remember that this project is 25% of the course grade, so just one +2 on this project is worth more than a -2 on every single assignment added together 
  - You should first fulfill all the Critical and Additional Requirements for the same reasons: missing them hurts more on a Project
- If you are not showing the lessons from class, your grade will be worse or even given a 0. Each week builds on the material from the previous week so it is important that you learn and practice the lessons from class.

Note: The project is to show your understanding of the material from class.  If you don't do that, you can lose points, even it "it works".  Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).

### Critical Requirements
- Project includes a README giving necessary information as required
- Your project attempts to demonstrate the expected level of skill from the course
- Code structure and content matches the requirements 
- Code runs successfully, using expected methods, when running `npm install; npm run build; npm start`
  - Mistakes that still show an understanding of the expectation, such as failing to commit a file, miss an Additional Requirement
  - Mistakes that reveal a misunderstanding of the expected code setup miss this Critical Requirement
- Follow all "do not" Restrictions, including in particular but not limited to: (each a separate requirement)
  - Allowed/banned packages/modules/libraries/resources
  - Do not use front end JS to modify the DOM outside of React
  - Do not use style attributes/properties/props
  - Do not use CSS-in-JS, CSS-modules, styled-components, or other approaches to CSS that do not match the examples from class

### Additional Requirements
- PR contains only work that is part of this assignment
- PR follows expectations for PRs in this course
- The listed Expectations not covered by other requirements are fulfilled
- The listed Restrictions not covered by other requirements are fulfilled
- Server code should have distinct separation of data models (state) and the code that changes them from the code that handles server route handling
- Server code is understandable, skimmable, with files, functions, and variables well-named for what they hold, represent, and do
- Your services each follow all 3 of my basic rules of REST
- Services that require auth must confirm auth 
  - Outside of login/logout, if you have any services that intentionally do NOT require auth, mention that specifically in the README
- At least some services require auth
- You must use at least 3 distinct HTTP methods as part of RESTful services 
- Your services must interact with changing server-side state beyond sessions
- Your services validate/sanitize data before saving it to state
  - You must not sanitize for HTML insertion per Security Expectations (React will do that)
  - You must validate/sanitize data that can have the characters allow-listed
    - Email addresses are complicated and may be validated simply by containing an `@` character
- Your HTML uses semantic elements correctly and when applicable
- Your HTML is valid and complete
- Your page uses a correct and useful `<title>`
  - This must not be the default
- Your class names are semantic and use kebab-case or BEM
- Your CSS is contained within CSS files
- Your CSS is in multiple CSS files as recommended in the React unit of the course
- Your HTML and CSS follow the best practices as taught in class
- When a service call means that a user must take action or should be made aware, the application shows the user a message or required step
  - Messages sent to the console do not count as being shown to the user
- Your JSX follows the best practices as taught in class
- No Component should be too large and complex
- Client side state should be clear and understandable

### Bonus Requirements

There are two categories of Bonus Requirements. Fulfilling a Bonus Requirement means doing so in a way that demonstrates your skill and understanding of the material from class.  Simply having "working" code may not do so!

Each fulfilled Bonus Requirement is +2 points, and each category may have a total of 5 fulfilling Bonus Requirements, for a total possible +20 Points.  The project grade may exceed 100%.

Specific Bonus Requirements may be fulfilled multiple times, but no single Bonus Requirement may be fulfilled for credit more than 3 times.

#### Bonus Requirements: Extra Service Interaction Complexity
More complex service interactions beyond the minimum.  Pointless or minimal effort inclusions will not count.  The below may each be fulfilled more than once each, but no single Bonus Requirement may be fulfilled for credit more than three times, and this category may only provide credit for 5 Bonus Requirements (+10 points max)

- Additional HTTP methods (used in an appropriate RESTful way) beyond the minimum required 3
- Polling when appropriate to the application
  - Remember to perform clean up of any intervals!
- Services with (used) pagination
- Services with filtered data per query param(s) or data send in body

#### Bonus Requirements: Extra State Complexity
State models and/or interactions with models that are above average complexity by necessity.  Needless complexity or minimal effort inclusions will not count.  The below may each be fulfilled more than once each, but no single Bonus Requirement may be fulfilled for credit more than three times, and this category may only provide credit for 5 Bonus Requirements (+10 points max)

- Different levels of authorization (example: users not yet logged in, logged in users, logged in administrators) are able to use different services or get different results from those services
  - As we don't have passwords, this would be based on the user name and data saying which users have what permissions
  - Mention any predefined usernames and permissions in the README
- Different "pages" and screens that are managed through state
  - Note: react-router is NOT allowed, forcing you to show your understanding of conditional rendering
  - The larger the number of visual states that are possible (and managed correctly), the more impressive the work
- Handling the "Back" button to provide "deeplinking" 
- Complex form validation with visual feedback to the user 
  - "Complex" here means interactions like:
    - A field validation is based on multiple fields (example: a field is required only if a checkbox is checked")
    - Data has an unusual "shape" that is well validated (example: GPS coordinates).  Note: Validating complex fields in ways that prevent valid answers (Names, phone numbers, email) won't count!
- Excellent architecture and separation of concerns on both front end and backend
  - This is tested by your models, code organization, and execution flow being easy to follow and understand
- Good use of useReducer to update state via "action" concepts

