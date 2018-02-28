'use strict'

// How nodejs actually copies current process and its state?
// Will it copy global variables and how?
// https://www.bottomupcs.com/fork_and_exec.xhtml

//// It doesn't:
// > Note: Unlike the fork(2) POSIX system call, child_process.fork() does not clone the current process.
// https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options

// i.e. fork is just an exec (spawn) designed for spawning new nodejs processes.

// LOL, fork is just a decorator around spawn
// https://github.com/nodejs/node/blob/f2defcac4dd10f018215e3db530bed1314ce2225/lib/child_process.js#L55-L105
