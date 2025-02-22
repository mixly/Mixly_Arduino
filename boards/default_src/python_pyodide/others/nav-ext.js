import { app, Nav, Debug } from 'mixly';
import * as Blockly from 'blockly/core';
import PythonShell from './python-shell';

const NavExt = {};

NavExt.init = async function () {
    const nav = app.getNav();

    nav.register({
        icon: 'icon-play-circled',
        title: '',
        id: 'python-run-btn',
        displayText: Blockly.Msg.MSG['run'],
        preconditionFn: () => {
            return true;
        },
        callback: () => {
            PythonShell.run().catch(Debug.error);
        },
        scopeType: Nav.Scope.LEFT,
        weight: 4
    });

    nav.register({
        icon: 'icon-cancel',
        title: '',
        id: 'python-stop-btn',
        displayText: Blockly.Msg.MSG['stop'],
        preconditionFn: () => {
            return true;
        },
        callback: () => {
            PythonShell.stop().catch(Debug.error);
        },
        scopeType: Nav.Scope.LEFT,
        weight: 5
    });

    await PythonShell.init();
}

export default NavExt;