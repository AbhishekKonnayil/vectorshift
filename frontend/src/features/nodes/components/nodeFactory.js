import React from 'react';
import { BaseNode } from './baseNode';

/**
 * Higher-order component factory for creating ReactFlow nodes.
 * @param {Object} config - Configuration for the node.
 * @param {string} config.title - The title displayed in the node header.
 * @param {Array} config.handles - Array of handle configurations.
 * @param {string} [config.description] - Default description if no child is provided.
 * @param {Function} [config.renderContent] - Optional function to render custom content.
 */
export const createNode = (config) => {
    const { title, handles = [], description, renderContent } = config;

    return ({ id, data, children, handles: propHandles }) => {
        // Use prop handles if provided, otherwise fallback to config handles
        const effectiveHandles = propHandles || handles;

        // Ensure handles have unique IDs by prefixing them with the node ID if not already prefixed
        const processedHandles = effectiveHandles.map((handle, index) => ({
            ...handle,
            id: handle.id ? (handle.id.startsWith(id) ? handle.id : `${id}-${handle.id}`) : `${id}-handle-${index}`
        }));

        return (
            <BaseNode
                id={id}
                title={title}
                handles={processedHandles}
            >
                {children}
                {!children && (renderContent ? renderContent({ id, data }) : (
                    <span>{data?.description || description || `This is a ${title} node.`}</span>
                ))}
            </BaseNode>
        );
    };
};
