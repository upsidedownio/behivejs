/**
 * @typedef {object} TreeDefinition
 * @property {string}                   type
 * @property {string}                  [name]
 * @property {object}                  [properties]
 * @property {Array<TreeDefinition>}   [children]
 * @property {TreeDefinition}          [child]
 */

/**
 * Class TreeBuilder
 */
class TreeBuilder {

    /**
     * @constructor
     * @param {object}          params
     * @param {Registry}        params.registry
     * @param {TreeDefinition}  params.treeDefinition
     */
    constructor({registry, treeDefinition} = {}) {
        /** @type {Registry} */
        this.registry = registry;
        /** @type {TreeDefinition} */
        this.treeDefinition = treeDefinition;
    }
}

module.exports = TreeBuilder;
