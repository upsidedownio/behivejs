const BaseComposite = require('../core/BaseComposite');
const {FAILURE, RUNNING} = require('../constants');

/**
 * @class Priority
 * @extends BaseComposite
 **/
module.exports = class Priority extends BaseComposite {

    /**
     * @constructor
     * @param {Object}      params
     * @param {BaseNode[]}  params.children
     */
    constructor({children = [], name} = {}) {
        super({
            type: 'Priority',
            name,
            children
        });
    }

    /**
     * @override
     * @function open
     * @param {Context} context
     **/
    open(context) {
        context.blackboard.tree(context.tree).node(this).set('runningChild', 0);
    }

    /**
     * @override
     * @function run
     * @param {Context} context
     * @return {Constant}
     **/
    run(context) {
        const nodeBoard = context.blackboard.tree(context.tree).node(this);
        const child = nodeBoard.get('runningChild');
        for (let i = child; i < this.children.length; i++) {
            const status = this.children[i].tick(context);

            if (status !== FAILURE) {
                if (status === RUNNING) {
                    nodeBoard.set('runningChild', i);
                }
                return status;
            }
        }

        return FAILURE;
    }
};
