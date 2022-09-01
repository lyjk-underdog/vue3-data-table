import type { messageType } from 'element-plus';

function useHint(
    cb: () => Promise<any>,
    message: string,
    confirmType: messageType = 'warning',
) {

    return new Promise<void>(async (resolve, reject) => {
        try {
            await ElMessageBox.confirm(`是否${message}`, '提示', {
                type: confirmType,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                beforeClose: async (action, instance, done) => {
                    if (action === "confirm") {
                        try {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = "删除中...";

                            await cb();

                            ElMessage({
                                type: "success",
                                message: `${message}成功!`
                            });

                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = "确定";
                            done();

                            resolve();
                        } catch (e) {
                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = "确定";
                            console.error(e);

                            reject();
                        }
                    } else {
                        done();
                    }
                },
            })

        } catch (e) {
            if (e === "cancel") {
                ElMessage({
                    type: "info",
                    message: `已取消${message}!`
                });
            }
            else console.error(e);

            reject();
        }
    })

}

export default useHint;