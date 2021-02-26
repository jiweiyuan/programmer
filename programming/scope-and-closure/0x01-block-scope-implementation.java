public class Context {
    // ...
    Context parent = null;

    // 作用域中的所有变量
    VariableObject vo = null;
}

public class VariableObject {
    //成员变量
    protected Map<Variable, Object> fields = new HashMap<Variable, Object>();
}



// Context Stack implementation
private Stack<Context> ECStack = new Stack<Context>();

// When entry if block:
Context iFContext = new StackFrame();
stack.push(iFContext);


// When exit if block
ECStack.pop();


// Read a variable by `variableName`
Context ctx = ECStack.peek();
VariableObject vo = null;
while (ctx != null) {
    vo = ctx.vo;
    if (Object value = vo.get(variableName) != null)  {
        return value;
    }
    ctx = ctx.parent; // scope chain
}
// Reference error
