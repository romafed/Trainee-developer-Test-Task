export const userRegistrationFake = user => {
    const isRegistered = localStorage.getItem(user.email);
    if (isRegistered) throw new Error('Is already registered');
    
    localStorage.setItem(user.email, JSON.stringify(user));
};

export const userLoginFake = input => {
    const user = JSON.parse(localStorage.getItem(input.email));
    if (!user) throw new Error('Email or Password is incorrect');

    const isCorrectPassword = user.password === input.password
    if (!isCorrectPassword) throw new Error('Email or Password is incorrect');

    delete user.password
    return user;
}

export const addTaskFake = (task, email) => {
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) throw new Error('Cant find user');

    user.tasks = [{id: Date.now(), title: task}, ...user.tasks];
    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export const deleteTaskFake = (taskId, email) => {
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) throw new Error('Cant find user');

    user.tasks = user.tasks.filter(task => task.id !== taskId);
    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export const editTaskFake = (taskId, title, email) => {
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) throw new Error('Cant find user');

    const task = user.tasks.find(task => task.id === taskId);
    const index = user.tasks.indexOf(task);
    user.tasks[index].title = title;

    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export const shareTaskFake = (task, user, email) => {
    if (user.email === email) throw new Error('This is your email');
    const { name, surname } = user;
    const shareUser = JSON.parse(localStorage.getItem(email));
    if (!shareUser) throw new Error('Cant find user');

    shareUser.tasks = [{id: Date.now(), title: task, author: `${name} ${surname}`}, ...shareUser.tasks];
    localStorage.setItem(email, JSON.stringify(shareUser));
}


