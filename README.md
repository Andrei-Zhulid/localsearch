# Run Instructions

## Backend solution

1. Open backend folder:

```
cd backend/
```

2. Install dependencies:

```
npm install
```

3. Run:

```
npm run dev
```

## Frontend solution

**Pre-requirements:** Make sure backend service is already running.

1. Open frontend folder:

```
cd frontend/
```

2. Install dependencies:

```
npm install
```

3. Run:

```
npm run serve
```

4. Open http://localhost:8080/

# Search Instructions

* Search is performed starting from words boundaries. In other words, the search find a match if any word starts from the query.
* In case of several words query should match a substring of a word boundary.
* Empty search (or only spaces) returns all places.

# Assumptions

* Data is unchangeable. Service pre-loads all data due to this assumption.
* Place objects returned from the API contain only open time intervals (type: "OPEN"). Due to this assumption, the service doesn't expect
  any
  other types.

In the real world the solution should include the following items which are omitted in the current solution for simplicity:

* error middleware (in the current solution all errors are printed to the console);
* request/response schemas
* tests
* path configuration (in the current solution all paths are relative)
* etc.