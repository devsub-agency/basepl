import getRegistryUrl from "@/src/utils/registry/url";
import {logger, loggingColor} from "@/src/utils/logging/logger";
import handleError from "@/src/utils/error/handle-error";

const fetchRegistry = async (paths: string[]) => {
    try{
        return await Promise.all(
            paths.map(async (path) => {
                const url = getRegistryUrl(path);
                const response = await fetch(path)
                if (!response.ok) {
                    const errorMessages: { [key: number]: string } = {
                        400: "Bad request",
                        401: "Unauthorized",
                        403: "Forbidden",
                        404: "Not found",
                        500: "Internal server error",
                    }

                    if (response.status === 401) {
                        throw new Error(
                            `You are not authorized to access the component at ${loggingColor.info(
                                url
                            )}.\nIf this is a remote registry, you may need to authenticate.`
                        )
                    }

                    if (response.status === 404) {
                        throw new Error(
                            `The component at ${loggingColor.info(
                                url
                            )} was not found.\nIt may not exist at the registry. Please make sure it is a valid component.`
                        )
                    }

                    if (response.status === 403) {
                        throw new Error(
                            `You do not have access to the component at ${loggingColor.info(
                                url
                            )}.\nIf this is a remote registry, you may need to authenticate or a token.`
                        )
                    }

                    const result = await response.json()
                    const message =
                        result && typeof result === "object" && "error" in result
                            ? result.error
                            : response.statusText || errorMessages[response.status]
                    throw new Error(
                        `Failed to fetch from ${loggingColor.info(url)}.\n${message}`
                    )
                }

                return response.json()
            })
        )
    } catch (error) {
        logger.error("\n")
        handleError(error)
        return []
    }
}