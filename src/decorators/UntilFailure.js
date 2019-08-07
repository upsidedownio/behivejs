const BaseDecorator = require('../core/BaseDecorator');
const {SUCCESS, FAILURE, ERROR, RUNNING} = require('../constants');

/**
 * Class UntilFailure
 * UntilFailure is a decorator that repeats the run signal until the
 * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @extends BaseDecorator
 * @category Decorators
 **/

class UntilFailure extends BaseDecorator {

    /**
     * Creates an instance of UntilFailure.
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 (infinite).
     * - **child** (*BaseNode*) The child node.
     * @constructor
     * @param {Object} params Object with parameters.
     * @param {Number} params.maxLoop Maximum number of repetitions. Default to -1 (infinite).
     * @param {BaseNode} params.child The child node.
     **/
    constructor({maxLoop = -1, child = null} = {}) {
        super({
            child,
            type: 'UntilFailure',
            name: 'Until Failure',
            properties: {maxLoop: -1},
        });

        this.maxLoop = maxLoop;
    }

    /**
     * Open method.
     * @param {Context} context A run instance.
     **/
    open(context) {
        context.blackboard.tree(context.tree.id).node(this.id).set('i', 0);
    }

    /**
     * Context method.
     * @param {Context} context A run instance.
     * @return {Constant} A state constant.
     **/
    run(context) {
        if (!this.child) {
            return ERROR;
        }

        let i = context.blackboard.tree(context.tree.id).node(this.id).get('i');
        let childStatus = RUNNING;

        if (this.maxLoop < 0 || i < this.maxLoop) {
            childStatus = this.child.tick(context);

            if (childStatus === SUCCESS) {
                i++;
            } else if (childStatus === RUNNING) {
                return RUNNING;
            } else if (childStatus === FAILURE) {
                // end condition
                return SUCCESS;
            } else {
                return ERROR;
            }
        } else if (i >= this.maxLoop) {
            return SUCCESS;
        }

        context.blackboard.tree(context.tree.id).node(this.id).set('i', i);
        return childStatus;
    }
}

module.exports = UntilFailure;
