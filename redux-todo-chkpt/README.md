# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Practice Challenge:
  What You're Aiming For

In this checkpoint, we are going to use what we have learned previously to create a ToDo Application while using Redux to manage the global state.
Instructions

    Create  the following component:
        Addtask
        ListTask
        Task
    Every task should have the following attributes:I d, description, isDone
    The user should be:
        Able to add a newTodo
        Filter the tasks by (done/not)
        Edit a task
