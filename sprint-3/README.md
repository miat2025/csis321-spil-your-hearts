# SpiL Your Hearts

#### Oscar Chang, Levi Interian, Ady Swanson, Mia Takahashi

### Software Architecture
- Identify and describe the major software components and their functionality at a conceptual level
  - **HTML** - Provides the framework for how the website is visually structured.
  - **CSS** - Adds a visual appeal to our website
  - **JavaScript** - Adds functionality to the website and create the backend server
  - **PostgreSQL** - Our chosen database management system
- Specify the interfaces between components
  - All the front end level components will interface with an API middleware with the backend. If needed, the admin components will be connected with a websocket to the backend server if live updates are required.
- Describe in detail what data your system stores, and how. If it uses a database, give the high level database schema. If not, describe how you are storing the data and its organization.
  - **Chapel Services** -Our system will store data for the details of chapel services that include what’s listed below. At the moment, students do not have access to all of this information, namely the specific message and/or topic for each chapel. This data will be taken from an existing spreadsheet that SpiL has and transferred to. 
    1. Series
    2. Date
    3. Time
    4. Guest Speaker
    5. Specific Message/Topic for the chapel
  - Form Submissions - After students submit the form to indicate their intent to participate, their submissions will be stored in a database though a POST API request to the server. SpiL admin will be able to see this data on their end through the GET requests.
 
### Software Design
- Functional Decomposition- A module decomposition diagram for your system
- ER diagram
