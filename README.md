# Frontend Developer Assignment: UI Implementation

## Objective
Assignment submission by Harshvardhan Rathore. Contact me at rharshvardhan614@gmail.com.
Implements the Frontend resembling as demonstrated in the provided video reference. Each row represents a state, with the first column dedicated to product filters and the subsequent columns representing design variants.


## Features

- **Add/Delete a State**: Dynamically add and remove states (rows) in the table.
- **Add/Delete Variant Columns**: Dynamically add and remove variant columns in the table.
- **Row Reordering**: Reorder the state rows using drag-and-drop functionality.
- **Design Insertion**: Insert a design into a specific variant column.
- **Scroll for Variants**: Scroll functionality for variant columns if the number of variants exceeds 4.

## Technologies Used

- **React** (Next.js)
- **Tailwind CSS** for styling
- **react-dnd** for drag-and-drop functionality
- **react-toastify** for notifications

## Dependencies

```json
"dependencies": {
  "immutability-helper": "^3.1.1",
  "next": "14.2.5",
  "prop-types": "^15.8.1",
  "react": "^18",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dom": "^18",
  "react-hot-toast": "^2.4.1"
}

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**
    ```sh
    cd <project_directory>
    ```

3. **Install the dependencies:**
    ```sh
    npm install
    ```

### Running the Application

To run the application, use the following command:
```sh
npm run dev
