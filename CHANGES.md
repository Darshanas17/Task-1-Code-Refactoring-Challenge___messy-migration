# Major Issues I Identified

- Security risks like unsafe SQL queries and storing <b>passwords as plain text</b>
- No checks for user input, so bad or harmful data could break the app or cause security problems
- No login/auth protection on important API routes
- Everything was mixed together in one file — making the code hard to understand and maintain
- No error handling implemented — missing try-except blocks, input validation, and structured error responses.

- Secrets and config values were hardcoded directly into the code instead of being loaded securely from environment variables.

- No checks to ensure essential environment variables were set before the app ran

---

# Changes I Made and Why

- Organized the project into clearly defined folders: `controllers`, `routes`, `middleware`, `validators`, and `db` helpers — to improve readability and maintainability
- Replaced unsafe SQL queries with safe, parameterized queries to prevent SQL injection
- Hashed user passwords using `bcrypt` to avoid storing plain text passwords
- Added JWT-based authentication and middleware to secure protected routes
- Added input validation to ensure all incoming data is properly formatted and safe
- Used `helmet` middleware to add secure HTTP headers
- Added rate limiting to protect against brute-force attacks
- Created centralized error-handling middleware for consistent error responses
- Moved all sensitive configuration into a `.env` file and added startup checks to verify they’re defined
- Replaced synchronous DB access with an async-friendly database setup and initialization process

---

# Assumptions or Trade-Offs I Made

- All authenticated users currently have equal permissions; no roles or access levels were added
- Password reset and email verification were considered out of scope for this version
- JWT tokens expire but there’s no refresh token or logout mechanism in place yet
- Input validation covers basic fields only (not extensive or custom validations)
- Only manual testing was performed — no automated tests were written due to time constraints

---

# What I Would Do With More Time

- Write automated unit and integration tests to ensure ongoing reliability
- Implement role-based access control (e.g., admin vs user)
- Add support for password reset and email verification flows
- Create complete API documentation using Swagger
- Add support for JWT refresh tokens and logout functionality for better session management

---

# AI Usage Disclosure & Policy

I used AI tools like **ChatGPT** and **GitHub Copilot** to assist with parts of this project. Here's how they were used:

### Tools Used:

- **ChatGPT by OpenAI**
- **GitHub Copilot**

### What I Used Them For:

- **ChatGPT**:

  - Helped write and organize this `CHANGES.md` file from `CHANGES.txt` in a clean and readable format
  - Explained how to use `helmet` for securing HTTP headers
  - Assisted with writing a proper email regex for input validation
  - Suggested best practices like pre-checking required environment variables

- **GitHub Copilot**:

  - Helped generate parts of the `README.md` file, such as standard sections and formatting

### How I Handled AI Output:

I reviewed and edited all AI-generated content to ensure it was accurate, secure, and relevant to the project. Any suggestions that didn’t fit were modified or left out.
