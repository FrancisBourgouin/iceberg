# Data structure for tech interviews

## Question

```ts
  interface Question {
    question: String;             // Question statement
    startingCode?: String;        // Starting code 
    readOnly: Boolean;            // If the question is readOnly (verbal assessment)
    answer?: String;              // Candidate's answer
    duration?: Int;               // Duration in minutes for answering the question
    rating?: Int;                 // Rating out of 5 
    comment?: String;             // Interviewer's comment on performance
  }
```

## Interviewer

```ts
  interface Interviewer {
    id: String                    // id of the interviewer
    name: String                  // name of the interviewer
    description: String           // description of the interviewer
    email: String                 // email address of the interviewer
  }
```

## Candidate

```ts
  interface Candidate {
    name: String                  // name of the candidate
    email: String                 // email address of the candidate
  }
```
## Interview

```ts
  interface Interview {
    id: String                    // id of the interview
    name: String;                 // Name of the interview
    description?: String;         // Description of the interview
    duration: Int;                // Intended duration in minutes
    questions: [Question];        // List of questions for specific interview
    interviewer?: Interviewer;    // Interviewer information
    candidate?: Candidate;        // Name of the candidate
  }
```

## Interviews

```ts
  interface Interviews {
    interviews: [Interview]       // List of available interviews 
  }
```